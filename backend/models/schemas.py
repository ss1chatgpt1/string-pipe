from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime
import uuid

class Agent(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    model: str = "deepseek/deepseek-r1-0528-qwen3-8b:free"
    system_prompt: str
    tools: List[str] = Field(default_factory=list)
    memory_enabled: bool = True
    status: str = "active"  # active, inactive, training
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: str
    performance_metrics: Dict[str, Any] = Field(default_factory=dict)
    
class AgentCreate(BaseModel):
    name: str
    description: str
    system_prompt: str
    tools: List[str] = Field(default_factory=list)
    memory_enabled: bool = True
    user_id: str

class AgentUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    system_prompt: Optional[str] = None
    tools: Optional[List[str]] = None
    memory_enabled: Optional[bool] = None
    status: Optional[str] = None

class Workflow(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    nodes: List[Dict[str, Any]] = Field(default_factory=list)
    connections: List[Dict[str, str]] = Field(default_factory=list)
    triggers: List[Dict[str, Any]] = Field(default_factory=list)
    status: str = "draft"  # draft, active, inactive
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    user_id: str
    execution_count: int = 0
    last_execution: Optional[datetime] = None

class WorkflowCreate(BaseModel):
    name: str
    description: str
    nodes: List[Dict[str, Any]] = Field(default_factory=list)
    connections: List[Dict[str, str]] = Field(default_factory=list)
    triggers: List[Dict[str, Any]] = Field(default_factory=list)
    user_id: str

class WorkflowUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    nodes: Optional[List[Dict[str, Any]]] = None
    connections: Optional[List[Dict[str, str]]] = None
    triggers: Optional[List[Dict[str, Any]]] = None
    status: Optional[str] = None

class Template(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    category: str
    tags: List[str] = Field(default_factory=list)
    template_data: Dict[str, Any] = Field(default_factory=dict)
    is_public: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    created_by: str
    usage_count: int = 0
    rating: float = 0.0
    
class TemplateCreate(BaseModel):
    name: str
    description: str
    category: str
    tags: List[str] = Field(default_factory=list)
    template_data: Dict[str, Any] = Field(default_factory=dict)
    is_public: bool = True
    created_by: str

class TemplateUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    tags: Optional[List[str]] = None
    template_data: Optional[Dict[str, Any]] = None
    is_public: Optional[bool] = None

class User(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    username: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    subscription_plan: str = "free"  # free, pro, enterprise
    usage_stats: Dict[str, Any] = Field(default_factory=dict)

class UserCreate(BaseModel):
    email: str
    username: str
    subscription_plan: str = "free"

class UserUpdate(BaseModel):
    email: Optional[str] = None
    username: Optional[str] = None
    subscription_plan: Optional[str] = None
    is_active: Optional[bool] = None

class ChatMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    agent_id: str
    session_id: str
    user_message: str
    agent_response: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    response_time: float = 0.0
    tokens_used: int = 0

class ChatSession(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    agent_id: str
    user_id: str
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True
    message_count: int = 0