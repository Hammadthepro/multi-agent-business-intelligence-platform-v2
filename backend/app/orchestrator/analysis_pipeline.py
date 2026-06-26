import asyncio

from app.research.context_builder import context_builder

from app.agents.market_agent import MarketAgent
from app.agents.competitor_agent import CompetitorAgent
from app.agents.lead_agent import LeadAgent
from app.agents.audit_agent import AuditAgent


class AnalysisPipeline:

    def __init__(self):
        self.market_agent = MarketAgent()
        self.competitor_agent = CompetitorAgent()
        self.lead_agent = LeadAgent()
        self.audit_agent = AuditAgent()

    async def run(self, request):

        # Build shared research context once
        context = await context_builder.build(request)

        market, competitors, leads, audit = await asyncio.gather(
            self.market_agent.execute(request, context),
            self.competitor_agent.execute(request, context),
            self.lead_agent.execute(request, context),
            self.audit_agent.execute(request, context),
        )

        return {
            "context": {
                "query": context["query"]
            },
            "market": market,
            "competitors": competitors,
            "leads": leads,
            "audit": audit,
        }


pipeline = AnalysisPipeline()