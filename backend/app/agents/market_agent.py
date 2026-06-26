import json

from app.agents.base_agent import BaseAgent
from app.services.groq_service import ask_groq
from app.services.tavily_service import (
    search_web,
    format_search_results,
)
from app.utils.prompts import market_prompt


class MarketAgent(BaseAgent):

    def __init__(self):
        super().__init__("Market Agent")

    async def run(self, request, context):


        prompt = market_prompt(
            request.company_name,
            request.industry,
            request.target_market,
            context["context"],
        )

        response = ask_groq(prompt)

        return json.loads(response)