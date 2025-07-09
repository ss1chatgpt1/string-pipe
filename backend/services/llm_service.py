from emergentintegrations.llm.chat import chat
import os
from typing import Dict, Any, Optional
import logging

logger = logging.getLogger(__name__)

class LLMService:
    def __init__(self):
        self.api_key = os.environ.get('OPENROUTER_API_KEY')
        self.model = "deepseek/deepseek-r1-0528-qwen3-8b:free"
        
        if not self.api_key:
            raise ValueError("OPENROUTER_API_KEY environment variable is required")
    
    async def chat_with_agent(
        self, 
        system_prompt: str, 
        user_message: str, 
        conversation_history: Optional[list] = None
    ) -> Dict[str, Any]:
        """
        Chat with an agent using the OpenRouter DeepSeek model
        """
        try:
            # Prepare messages for the chat
            messages = []
            
            # Add system message
            if system_prompt:
                messages.append({
                    "role": "system",
                    "content": system_prompt
                })
            
            # Add conversation history if provided
            if conversation_history:
                messages.extend(conversation_history)
            
            # Add current user message
            messages.append({
                "role": "user",
                "content": user_message
            })
            
            # Make the API call
            response = await chat(
                model=self.model,
                messages=messages,
                api_key=self.api_key,
                provider="openrouter"
            )
            
            return {
                "success": True,
                "response": response.get('choices', [{}])[0].get('message', {}).get('content', ''),
                "usage": response.get('usage', {}),
                "model": self.model
            }
            
        except Exception as e:
            logger.error(f"Error in chat_with_agent: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "response": "I apologize, but I encountered an error while processing your request."
            }
    
    async def generate_agent_response(
        self, 
        agent_config: Dict[str, Any], 
        user_message: str,
        session_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """
        Generate a response from an agent with specific configuration
        """
        try:
            system_prompt = agent_config.get('system_prompt', '')
            conversation_history = session_context.get('history', []) if session_context else []
            
            # Enhance system prompt with agent-specific instructions
            enhanced_system_prompt = f"""
{system_prompt}

You are an AI agent with the following configuration:
- Name: {agent_config.get('name', 'Assistant')}
- Description: {agent_config.get('description', '')}
- Available Tools: {', '.join(agent_config.get('tools', []))}
- Memory Enabled: {agent_config.get('memory_enabled', True)}

Please respond according to your configuration and maintain consistency with your role.
"""
            
            result = await self.chat_with_agent(
                system_prompt=enhanced_system_prompt,
                user_message=user_message,
                conversation_history=conversation_history
            )
            
            return result
            
        except Exception as e:
            logger.error(f"Error in generate_agent_response: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "response": "I apologize, but I encountered an error while processing your request."
            }
    
    async def test_connection(self) -> Dict[str, Any]:
        """
        Test the LLM connection
        """
        try:
            test_response = await self.chat_with_agent(
                system_prompt="You are a helpful assistant.",
                user_message="Hello! Please respond with 'Connection successful!' to confirm the integration is working."
            )
            
            return {
                "success": test_response.get('success', False),
                "model": self.model,
                "response": test_response.get('response', ''),
                "provider": "openrouter"
            }
            
        except Exception as e:
            logger.error(f"Error in test_connection: {str(e)}")
            return {
                "success": False,
                "error": str(e),
                "provider": "openrouter"
            }

# Create a singleton instance
llm_service = LLMService()