import json

from app.agents.base_agent import BaseAgent
from app.services.groq_service import ask_groq
from app.utils.prompts import outreach_prompt


class OutreachAgent(BaseAgent):

    def __init__(self):
        super().__init__("Outreach Agent")

    async def run(self, request, opportunity):

        prompt = outreach_prompt(
            request.company_name,
            opportunity,
        )

        response = ask_groq(prompt)

        return json.loads(response)