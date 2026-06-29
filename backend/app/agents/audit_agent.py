import json

from app.agents.base_agent import BaseAgent
from app.analyzers.website_analyzer import website_analyzer
from app.services.groq_service import ask_groq
from app.utils.prompts import audit_prompt


class AuditAgent(BaseAgent):

    def __init__(self):
        super().__init__("Audit Agent")

    async def run(self, request, memory):

        analysis = website_analyzer.analyze(request.website)

        prompt = audit_prompt(
            request.company_name,
            request.website,
            analysis,
        )

        response = ask_groq(prompt)

        return json.loads(response)