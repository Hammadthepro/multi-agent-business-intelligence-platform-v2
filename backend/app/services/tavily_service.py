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