import json

from app.services.groq_service import ask_groq


class EntityExtractor:

    async def extract(self, knowledge: dict):

        entities = {}

        for category, searches in knowledge.items():

            prompt = f"""
You are an expert business intelligence analyst.

Below is research collected from multiple trusted sources.

Extract ONLY factual entities.

Return JSON only.

Schema:

{{
    "companies": [],
    "products": [],
    "technologies": [],
    "countries": [],
    "cities": [],
    "people": [],
    "statistics": [
        {{
            "metric":"",
            "value":""
        }}
    ],
    "trends": [],
    "keywords": []
}}

Research:

{json.dumps(searches, indent=2)}
"""

            response = ask_groq(prompt)

            try:
                entities[category] = json.loads(response)
            except Exception:
                entities[category] = {
                    "companies": [],
                    "products": [],
                    "technologies": [],
                    "countries": [],
                    "cities": [],
                    "people": [],
                    "statistics": [],
                    "trends": [],
                    "keywords": []
                }

        return entities