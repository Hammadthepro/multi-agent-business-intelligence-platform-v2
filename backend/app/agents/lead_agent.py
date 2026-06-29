import json

from app.agents.base_agent import BaseAgent
from app.services.groq_service import ask_groq
from app.utils.prompts import lead_prompt


class LeadAgent(BaseAgent):

    def __init__(self):
        super().__init__("Lead Agent")

    async def run(self, request, memory):

        research = memory.get("shared_intelligence")

        search_results = {
            "market": research["market"],
            "competitors": research["competitors"],
            "social": research["social"],
            "technology": research["technology"],
        }

        prompt = lead_prompt(
            request.company_name,
            request.industry,
            request.target_market,
            search_results,
        )

        response = ask_groq(prompt)

        result = json.loads(response)

        memory.set("leads", result)

        return result