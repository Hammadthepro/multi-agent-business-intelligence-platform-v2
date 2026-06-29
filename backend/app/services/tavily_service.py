import os

from dotenv import load_dotenv
from tavily import TavilyClient

load_dotenv()

client = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)


def search_web(query: str, max_results: int = 5):
    """
    Search the web using Tavily AI.

    Returns:
        List[dict]
    """

    response = client.search(
        query=query,
        search_depth="advanced",
        max_results=max_results,
    )

    return response.get("results", [])


def format_search_results(results):
    """
    Convert Tavily results into a compact format.

    Keep token usage LOW.
    """

    formatted = []

    for item in results:

        snippet = item.get("content", "")[:300]

        formatted.append(
            {
                "title": item.get("title", ""),
                "url": item.get("url", ""),
                "snippet": snippet,
            }
        )

    return formatted