from app.utils.context_builder import ContextBuilder
from app.memory.shared_memory import SharedMemory

from app.agents.search_planner_agent import SearchPlannerAgent
from app.agents.research_summarizer_agent import ResearchSummarizerAgent
from app.knowledge.knowledge_aggregator import KnowledgeAggregator


class IntelligencePipeline:

    def __init__(self):

        self.context_builder = ContextBuilder()
        self.search_planner = SearchPlannerAgent()
        self.knowledge = KnowledgeAggregator()
        self.summarizer = ResearchSummarizerAgent()

    async def run(self, request):

        memory = SharedMemory()

        # Base Context
        context = self.context_builder.build(request)
        memory.set("context", context)

        # Search Plan
        search_plan = await self.search_planner.run(request)
        memory.set("search_plan", search_plan)

        # Gather Research
        knowledge = await self.knowledge.build(search_plan)
        memory.set("knowledge", knowledge)

        # Summarize Research
        shared_intelligence = await self.summarizer.run(knowledge)
        memory.set("shared_intelligence", shared_intelligence)

        return {
            "context": context,
            "search_plan": search_plan,
            "shared_intelligence": shared_intelligence,
            "_memory": memory,
        }


pipeline = IntelligencePipeline()