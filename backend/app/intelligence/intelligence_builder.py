import json

from app.services.groq_service import ask_groq
from app.utils.prompts import research_summary_prompt


class IntelligenceBuilder:

    async def build(self, entities):

        intelligence = {}

        for category, items in entities.items():

            text = ""

            for item in items:

                text += f"\nQuery: {item['query']}\n"

                results = item["results"]

                # results is a list of extracted entities
                if isinstance(results, list):

                    for r in results:

                        text += f"""
Entity: {r.get("entity", "")}
Type: {r.get("type", "")}
Evidence:
{r.get("evidence", "")}

"""

                else:
                    text += str(results)

                text += "\n\n"

            prompt = research_summary_prompt(
                category,
                text,
            )

            response = ask_groq(prompt)

            try:
                intelligence[category] = json.loads(response)
            except Exception:
                intelligence[category] = {
                    "summary": response
                }

        return intelligence