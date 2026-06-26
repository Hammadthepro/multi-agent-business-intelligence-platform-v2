import json

from app.agents.base_agent import BaseAgent
from app.services.groq_service import ask_groq
from app.utils.prompts import competitor_prompt


class CompetitorAgent(BaseAgent):

    def __init__(self):
        super().__init__("Competitor Agent")

    async def run(self, request, context):

        prompt = competitor_prompt(
            request.company_name,
            request.industry,
            request.target_market,
            context["context"],
        )

        response = ask_groq(prompt)

        return json.loads(response)