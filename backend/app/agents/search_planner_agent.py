import json

from app.agents.base_agent import BaseAgent
from app.services.groq_service import ask_groq
from app.utils.prompts import search_planner_prompt


class SearchPlannerAgent(BaseAgent):

    def __init__(self):
        super().__init__("Search Planner")

    async def run(self, request):

        prompt = search_planner_prompt(
            request.company_name,
            request.industry,
            request.target_market,
        )

        response = ask_groq(prompt)

        return json.loads(response)