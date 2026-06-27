import asyncio

from app.agents.market_agent import MarketAgent
from app.agents.competitor_agent import CompetitorAgent
from app.agents.lead_agent import LeadAgent
from app.agents.audit_agent import AuditAgent
from app.agents.opportunity_agent import OpportunityAgent
from app.agents.outreach_agent import OutreachAgent

from app.utils.context_builder import ContextBuilder


class AnalysisPipeline:

    def __init__(self):

        self.market = MarketAgent()
        self.competitor = CompetitorAgent()
        self.lead = LeadAgent()
        self.audit = AuditAgent()
        self.opportunity = OpportunityAgent()
        self.outreach = OutreachAgent()

    async def run(self, request):

        context = ContextBuilder().build(request)

        market, competitors, leads, audit = await asyncio.gather(
            self.market.run(request, context),
            self.competitor.run(request, context),
            self.lead.run(request, context),
            self.audit.run(request, context),
        )

        opportunity = await self.opportunity.run(
            request,
            market,
            competitors,
            leads,
            audit,
        )

        outreach = await self.outreach.run(
            request,
            opportunity,
        )

        return {
            "context": context,
            "market": market,
            "competitors": competitors,
            "leads": leads,
            "audit": audit,
            "opportunity": opportunity,
            "outreach": outreach,
        }


pipeline = AnalysisPipeline()