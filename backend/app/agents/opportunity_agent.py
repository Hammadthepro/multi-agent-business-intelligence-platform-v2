import json

from app.agents.base_agent import BaseAgent
from app.services.groq_service import ask_groq
from app.utils.prompts import opportunity_prompt


class OpportunityAgent(BaseAgent):

    def __init__(self):
        super().__init__("Opportunity Agent")

    async def run(
        self,
        market,
        competitors,
        leads,
        audit,
    ):

        prompt = opportunity_prompt(
            market,
            competitors,
            leads,
            audit,
        )

        response = ask_groq(prompt)

        return json.loads(response)