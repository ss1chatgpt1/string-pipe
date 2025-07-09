from fastapi import APIRouter, HTTPException
from services.llm_service import llm_service
import logging

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/llm", tags=["llm"])

@router.get("/test")
async def test_llm_connection():
    """Test the LLM connection"""
    try:
        result = await llm_service.test_connection()
        return result
    except Exception as e:
        logger.error(f"LLM test failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"LLM test failed: {str(e)}")

@router.post("/chat")
async def chat(message: str, system_prompt: str = "You are a helpful assistant."):
    """Direct chat with the LLM"""
    try:
        result = await llm_service.chat_with_agent(
            system_prompt=system_prompt,
            user_message=message
        )
        
        if not result.get("success"):
            raise HTTPException(status_code=500, detail=result.get("error", "Unknown error"))
        
        return result
    except Exception as e:
        logger.error(f"Chat failed: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Chat failed: {str(e)}")

@router.get("/models")
async def get_available_models():
    """Get information about available models"""
    return {
        "current_model": "deepseek/deepseek-r1-0528-qwen3-8b:free",
        "provider": "openrouter",
        "description": "DeepSeek R1 model via OpenRouter - free tier"
    }