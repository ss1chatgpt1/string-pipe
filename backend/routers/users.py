from fastapi import APIRouter, HTTPException
from typing import List
from datetime import datetime
from models.schemas import User, UserCreate, UserUpdate
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/users", tags=["users"])

# Database dependency
def get_database():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    return client[os.environ['DB_NAME']]

@router.get("/", response_model=List[User])
async def get_users():
    """Get all users"""
    db = get_database()
    users = await db.users.find().to_list(1000)
    return [User(**user) for user in users]

@router.get("/{user_id}", response_model=User)
async def get_user(user_id: str):
    """Get a specific user by ID"""
    db = get_database()
    user = await db.users.find_one({"id": user_id})
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return User(**user)

@router.post("/", response_model=User)
async def create_user(user: UserCreate):
    """Create a new user"""
    db = get_database()
    
    # Check if user with email already exists
    existing_user = await db.users.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(status_code=400, detail="User with this email already exists")
    
    # Check if username already exists
    existing_username = await db.users.find_one({"username": user.username})
    if existing_username:
        raise HTTPException(status_code=400, detail="Username already taken")
    
    # Create user object
    user_obj = User(**user.dict())
    
    # Insert into database
    await db.users.insert_one(user_obj.dict())
    
    return user_obj

@router.put("/{user_id}", response_model=User)
async def update_user(user_id: str, user_update: UserUpdate):
    """Update an existing user"""
    db = get_database()
    
    # Check if user exists
    existing_user = await db.users.find_one({"id": user_id})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Check for email conflicts if email is being updated
    if user_update.email:
        email_conflict = await db.users.find_one({
            "email": user_update.email,
            "id": {"$ne": user_id}
        })
        if email_conflict:
            raise HTTPException(status_code=400, detail="Email already in use")
    
    # Update fields
    update_data = user_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update in database
    await db.users.update_one(
        {"id": user_id},
        {"$set": update_data}
    )
    
    # Return updated user
    updated_user = await db.users.find_one({"id": user_id})
    return User(**updated_user)

@router.delete("/{user_id}")
async def delete_user(user_id: str):
    """Delete a user"""
    db = get_database()
    
    # Check if user exists
    existing_user = await db.users.find_one({"id": user_id})
    if not existing_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Delete from database
    await db.users.delete_one({"id": user_id})
    
    return {"message": "User deleted successfully"}

@router.get("/{user_id}/stats")
async def get_user_stats(user_id: str):
    """Get user statistics"""
    db = get_database()
    
    # Check if user exists
    user = await db.users.find_one({"id": user_id})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Get agent count
    agent_count = await db.agents.count_documents({"user_id": user_id})
    
    # Get workflow count
    workflow_count = await db.workflows.count_documents({"user_id": user_id})
    
    # Get template count (created by user)
    template_count = await db.templates.count_documents({"created_by": user_id})
    
    # Get chat session count
    session_count = await db.chat_sessions.count_documents({"user_id": user_id})
    
    return {
        "user_id": user_id,
        "agent_count": agent_count,
        "workflow_count": workflow_count,
        "template_count": template_count,
        "session_count": session_count,
        "subscription_plan": user.get("subscription_plan", "free")
    }