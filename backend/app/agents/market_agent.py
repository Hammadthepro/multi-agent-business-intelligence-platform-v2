import json

from app.agents.base_agent import BaseAgent
from app.services.groq_service import ask_groq
from app.utils.prompts import market_prompt


class MarketAgent(BaseAgent):

    def __init__(self):
        super().__init__("Market Agent")

    async def run(self, request, memory):

        research = memory.get("shared_intelligence")

        market_research = research["market"]

        prompt = market_prompt(
            request.company_name,
            request.industry,
            request.target_market,
            market_research,
        )

        response = ask_groq(prompt)

        result = json.loads(response)

        memory.set("market", result)

        return result