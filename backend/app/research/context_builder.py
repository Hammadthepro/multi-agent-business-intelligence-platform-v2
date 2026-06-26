from app.services.tavily_service import (
    search_web,
    format_search_results,
)


class ResearchContextBuilder:

    async def build(self, request):

        query = f"""
Company:
{request.company_name}

Industry:
{request.industry}

Target Market:
{request.target_market}

Latest market trends
Top competitors
Growing companies
Business opportunities
"""

        results = search_web(query)

        context = format_search_results(results)

        return {
            "query": query,
            "search_results": results,
            "context": context,
        }


context_builder = ResearchContextBuilder()