import json

from app.agents.base_agent import BaseAgent
from app.services.groq_service import ask_groq
from app.utils.prompts import pricing_prompt


class PricingAgent(BaseAgent):

    def __init__(self):
        super().__init__("Pricing Agent")

    async def run(self, request, memory):

        research = memory.get("shared_intelligence")

        search_results = research["pricing"]

        prompt = pricing_prompt(
            request.company_name,
            request.industry,
            search_results,
        )

        response = ask_groq(prompt)

        result = json.loads(response)

        memory.set("pricing", result)

        return result