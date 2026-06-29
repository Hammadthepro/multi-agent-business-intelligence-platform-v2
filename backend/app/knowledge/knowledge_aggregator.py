import asyncio

from app.services.tavily_service import (
    search_web,
    format_search_results,
)


class KnowledgeAggregator:

    async def build(self, search_plan):

        knowledge = {}

        for category, queries in search_plan.items():

            tasks = [
                asyncio.to_thread(search_web, query)
                for query in queries
            ]

            responses = await asyncio.gather(*tasks)

            category_results = []

            for query, results in zip(queries, responses):

                category_results.append(
                    {
                        "query": query,
                        "results": format_search_results(results),
                    }
                )

            knowledge[category] = category_results

        return knowledge