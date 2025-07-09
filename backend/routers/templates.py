from fastapi import APIRouter, HTTPException
from typing import List, Optional
from datetime import datetime
from models.schemas import Template, TemplateCreate, TemplateUpdate
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/templates", tags=["templates"])

# Database dependency
def get_database():
    client = AsyncIOMotorClient(os.environ['MONGO_URL'])
    return client[os.environ['DB_NAME']]

@router.get("/", response_model=List[Template])
async def get_templates(
    category: Optional[str] = None,
    is_public: Optional[bool] = None,
    created_by: Optional[str] = None
):
    """Get all templates with optional filters"""
    db = get_database()
    query = {}
    
    if category:
        query["category"] = category
    if is_public is not None:
        query["is_public"] = is_public
    if created_by:
        query["created_by"] = created_by
    
    templates = await db.templates.find(query).to_list(1000)
    return [Template(**template) for template in templates]

@router.get("/categories")
async def get_template_categories():
    """Get all available template categories"""
    db = get_database()
    categories = await db.templates.distinct("category")
    return {"categories": categories}

@router.get("/{template_id}", response_model=Template)
async def get_template(template_id: str):
    """Get a specific template by ID"""
    db = get_database()
    template = await db.templates.find_one({"id": template_id})
    
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return Template(**template)

@router.post("/", response_model=Template)
async def create_template(template: TemplateCreate):
    """Create a new template"""
    db = get_database()
    
    # Create template object
    template_obj = Template(**template.dict())
    
    # Insert into database
    await db.templates.insert_one(template_obj.dict())
    
    return template_obj

@router.put("/{template_id}", response_model=Template)
async def update_template(template_id: str, template_update: TemplateUpdate):
    """Update an existing template"""
    db = get_database()
    
    # Check if template exists
    existing_template = await db.templates.find_one({"id": template_id})
    if not existing_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Update fields
    update_data = template_update.dict(exclude_unset=True)
    update_data["updated_at"] = datetime.utcnow()
    
    # Update in database
    await db.templates.update_one(
        {"id": template_id},
        {"$set": update_data}
    )
    
    # Return updated template
    updated_template = await db.templates.find_one({"id": template_id})
    return Template(**updated_template)

@router.delete("/{template_id}")
async def delete_template(template_id: str):
    """Delete a template"""
    db = get_database()
    
    # Check if template exists
    existing_template = await db.templates.find_one({"id": template_id})
    if not existing_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Delete from database
    await db.templates.delete_one({"id": template_id})
    
    return {"message": "Template deleted successfully"}

@router.post("/{template_id}/use")
async def use_template(template_id: str):
    """Mark a template as used (increment usage count)"""
    db = get_database()
    
    # Check if template exists
    existing_template = await db.templates.find_one({"id": template_id})
    if not existing_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Increment usage count
    await db.templates.update_one(
        {"id": template_id},
        {"$inc": {"usage_count": 1}}
    )
    
    return {
        "template_id": template_id,
        "message": "Template usage recorded"
    }

@router.post("/{template_id}/rate")
async def rate_template(template_id: str, rating: float):
    """Rate a template (simple implementation)"""
    db = get_database()
    
    if not (1 <= rating <= 5):
        raise HTTPException(status_code=400, detail="Rating must be between 1 and 5")
    
    # Check if template exists
    existing_template = await db.templates.find_one({"id": template_id})
    if not existing_template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    # Simple rating update (in real implementation, you'd track individual ratings)
    current_rating = existing_template.get("rating", 0)
    usage_count = existing_template.get("usage_count", 0)
    
    # Calculate new average rating
    new_rating = ((current_rating * usage_count) + rating) / (usage_count + 1)
    
    await db.templates.update_one(
        {"id": template_id},
        {"$set": {"rating": new_rating}}
    )
    
    return {
        "template_id": template_id,
        "new_rating": new_rating,
        "message": "Template rating updated"
    }