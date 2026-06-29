import asyncio

from app.orchestrator.intelligence_pipeline import IntelligencePipeline

from app.agents.pricing_agent import PricingAgent
from app.agents.market_agent import MarketAgent
from app.agents.competitor_agent import CompetitorAgent
from app.agents.lead_agent import LeadAgent
from app.agents.audit_agent import AuditAgent
from app.agents.opportunity_agent import OpportunityAgent
from app.agents.outreach_agent import OutreachAgent


class AnalysisPipeline:

    def __init__(self):

        self.intelligence = IntelligencePipeline()

        self.pricing = PricingAgent()
        self.market = MarketAgent()
        self.competitor = CompetitorAgent()
        self.lead = LeadAgent()
        self.audit = AuditAgent()
        self.opportunity = OpportunityAgent()
        self.outreach = OutreachAgent()

    async def run(self, request):

        # Build shared memory
        intelligence = await self.intelligence.run(request)

        memory = intelligence.pop("_memory")

        # Run all research agents in parallel
        market, competitors, leads, audit, pricing = await asyncio.gather(

            self.market.run(request, memory),
            self.competitor.run(request, memory),
            self.lead.run(request, memory),
            self.audit.run(request, memory),
            self.pricing.run(request, memory),

        )

        # Build strategy
        opportunity = await self.opportunity.run(
            request,
            market,
            competitors,
            leads,
            audit,
            pricing,
        )

        # Generate outreach
        outreach = await self.outreach.run(
            request,
            opportunity,
        )

        print(type(intelligence))
        print(intelligence)
        
        return {
            "intelligence": intelligence,
            "market": market,
            "competitors": competitors,
            "leads": leads,
            "audit": audit,
            "pricing": pricing,
            "opportunity": opportunity,
            "outreach": outreach,
        }


pipeline = AnalysisPipeline()