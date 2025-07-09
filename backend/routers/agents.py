from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime
from models.schemas import Agent, AgentCreate, AgentUpdate, ChatMessage, ChatSession
from services.llm_service import llm_service
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/agents", tags=["agents"])

# Database dependency
def get_database():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    return client[os.environ['DB_NAME']]

@router.get("/", response_model=List[Agent])
async def get_agents(user_id: Optional[str] = None):
    """Get all agents, optionally filtered by user_id"""
    db = get_database()
    query = {}
    if user_id:
        query["user_id"] = user_id
    
    agents = await db.agents.find(query).to_list(1000)
    return [Agent(**agent) for agent in agents]

@router.get("/{agent_id}", response_model=Agent)
async def get_agent(agent_id: str):
    """Get a specific agent by ID"""
    db = get_database()
    agent = await db.agents.find_one({"id": agent_id})
    
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    return Agent(**agent)

@router.post("/", response_model=Agent)
async def create_agent(agent: AgentCreate):
    """Create a new agent"""
    db = get_database()
    
    # Create agent object
    agent_obj = Agent(**agent.dict())
    
    # Insert into database
    await db.agents.insert_one(agent_obj.dict())
    
    return agent_obj

@router.put("/{agent_id}", response_model=Agent)
async def update_agent(agent_id: str, agent_update: AgentUpdate):
    """Update an existing agent"""
    db = get_database()
    
    # Check if agent exists
    existing_agent = await db.agents.find_one({"id": agent_id})
    if not existing_agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # Update fields
    update_data = agent_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update in database
    await db.agents.update_one(
        {"id": agent_id},
        {"$set": update_data}
    )
    
    # Return updated agent
    updated_agent = await db.agents.find_one({"id": agent_id})
    return Agent(**updated_agent)

@router.delete("/{agent_id}")
async def delete_agent(agent_id: str):
    """Delete an agent"""
    db = get_database()
    
    # Check if agent exists
    existing_agent = await db.agents.find_one({"id": agent_id})
    if not existing_agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # Delete from database
    await db.agents.delete_one({"id": agent_id})
    
    return {"message": "Agent deleted successfully"}

@router.post("/{agent_id}/chat")
async def chat_with_agent(agent_id: str, message: str, session_id: Optional[str] = None):
    """Chat with a specific agent"""
    db = get_database()
    
    # Get agent
    agent = await db.agents.find_one({"id": agent_id})
    if not agent:
        raise HTTPException(status_code=404, detail="Agent not found")
    
    # Get or create session
    if session_id:
        session = await db.chat_sessions.find_one({"id": session_id})
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
    else:
        # Create new session
        session = ChatSession(
            agent_id=agent_id,
            user_id=agent.get("user_id", "default")
        )
        await db.chat_sessions.insert_one(session.dict())
        session_id = session.id
    
    # Get conversation history
    messages = await db.chat_messages.find({"session_id": session_id}).sort("timestamp", 1).to_list(50)
    conversation_history = []
    
    for msg in messages:
        conversation_history.append({"role": "user", "content": msg["user_message"]})
        conversation_history.append({"role": "assistant", "content": msg["agent_response"]})
    
    # Generate response using LLM
    response = await llm_service.generate_agent_response(
        agent_config=agent,
        user_message=message,
        session_context={"history": conversation_history}
    )
    
    if not response.get("success"):
        raise HTTPException(status_code=500, detail=f"LLM error: {response.get('error')}")
    
    # Save chat message
    chat_message = ChatMessage(
        agent_id=agent_id,
        session_id=session_id,
        user_message=message,
        agent_response=response["response"],
        tokens_used=response.get("usage", {}).get("total_tokens", 0)
    )
    
    await db.chat_messages.insert_one(chat_message.dict())
    
    # Update session
    await db.chat_sessions.update_one(
        {"id": session_id},
        {
            "$set": {"updated_at": datetime.utcnow()},
            "$inc": {"message_count": 1}
        }
    )
    
    return {
        "agent_id": agent_id,
        "session_id": session_id,
        "message": message,
        "response": response["response"],
        "usage": response.get("usage", {})
    }

@router.get("/{agent_id}/sessions")
async def get_agent_sessions(agent_id: str):
    """Get all chat sessions for an agent"""
    db = get_database()
    
    sessions = await db.chat_sessions.find({"agent_id": agent_id}).to_list(100)
    return [ChatSession(**session) for session in sessions]

@router.get("/{agent_id}/sessions/{session_id}/messages")
async def get_session_messages(agent_id: str, session_id: str):
    """Get all messages for a specific session"""
    db = get_database()
    
    messages = await db.chat_messages.find(
        {"agent_id": agent_id, "session_id": session_id}
    ).sort("timestamp", 1).to_list(1000)
    
    return [ChatMessage(**message) for message in messages]