from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
from models.schemas import Workflow, WorkflowCreate, WorkflowUpdate
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/workflows", tags=["workflows"])

# Database dependency
def get_database():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    return client[os.environ['DB_NAME']]

@router.get("/", response_model=List[Workflow])
async def get_workflows(user_id: Optional[str] = None):
    """Get all workflows, optionally filtered by user_id"""
    db = get_database()
    query = {}
    if user_id:
        query["user_id"] = user_id
    
    workflows = await db.workflows.find(query).to_list(1000)
    return [Workflow(**workflow) for workflow in workflows]

@router.get("/{workflow_id}", response_model=Workflow)
async def get_workflow(workflow_id: str):
    """Get a specific workflow by ID"""
    db = get_database()
    workflow = await db.workflows.find_one({"id": workflow_id})
    
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    return Workflow(**workflow)

@router.post("/", response_model=Workflow)
async def create_workflow(workflow: WorkflowCreate):
    """Create a new workflow"""
    db = get_database()
    
    # Create workflow object
    workflow_obj = Workflow(**workflow.dict())
    
    # Insert into database
    await db.workflows.insert_one(workflow_obj.dict())
    
    return workflow_obj

@router.put("/{workflow_id}", response_model=Workflow)
async def update_workflow(workflow_id: str, workflow_update: WorkflowUpdate):
    """Update an existing workflow"""
    db = get_database()
    
    # Check if workflow exists
    existing_workflow = await db.workflows.find_one({"id": workflow_id})
    if not existing_workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    # Update fields
    update_data = workflow_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update in database
    await db.workflows.update_one(
        {"id": workflow_id},
        {"$set": update_data}
    )
    
    # Return updated workflow
    updated_workflow = await db.workflows.find_one({"id": workflow_id})
    return Workflow(**updated_workflow)

@router.delete("/{workflow_id}")
async def delete_workflow(workflow_id: str):
    """Delete a workflow"""
    db = get_database()
    
    # Check if workflow exists
    existing_workflow = await db.workflows.find_one({"id": workflow_id})
    if not existing_workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    # Delete from database
    await db.workflows.delete_one({"id": workflow_id})
    
    return {"message": "Workflow deleted successfully"}

@router.post("/{workflow_id}/execute")
async def execute_workflow(workflow_id: str):
    """Execute a workflow (placeholder for now)"""
    db = get_database()
    
    # Get workflow
    workflow = await db.workflows.find_one({"id": workflow_id})
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    # Update execution count and last execution time
    await db.workflows.update_one(
        {"id": workflow_id},
        {
            "$inc": {"execution_count": 1},
            "$set": {"last_execution": datetime.utcnow()}
        }
    )
    
    return {
        "workflow_id": workflow_id,
        "status": "executed",
        "message": "Workflow execution completed (placeholder implementation)"
    }

@router.get("/{workflow_id}/status")
async def get_workflow_status(workflow_id: str):
    """Get workflow execution status"""
    db = get_database()
    
    workflow = await db.workflows.find_one({"id": workflow_id})
    if not workflow:
        raise HTTPException(status_code=404, detail="Workflow not found")
    
    return {
        "workflow_id": workflow_id,
        "status": workflow.get("status", "draft"),
        "execution_count": workflow.get("execution_count", 0),
        "last_execution": workflow.get("last_execution")
    }