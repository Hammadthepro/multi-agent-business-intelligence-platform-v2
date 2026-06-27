def market_prompt(company_name: str, industry: str, target_market: str, search_results: str) -> str:
    return f"""
You are a senior market research analyst.

Company:
{company_name}

Industry:
{industry}

Target Market:
{target_market}

Latest Web Research:
{search_results}

Analyze this business and return ONLY valid JSON.

Return this structure:

{{
    "market_size": "...",
    "growth_rate": "...",
    "trends": [],
    "opportunities": [],
    "risks": [],
    "recommended_services": []
}}

Do not include markdown.
Do not include explanations outside the JSON.
"""

def competitor_prompt(
    company_name: str,
    industry: str,
    target_market: str,
    search_results: str,
) -> str:
    return f"""
You are a senior competitive intelligence analyst.

Company:
{company_name}

Industry:
{industry}

Target Market:
{target_market}

Latest Web Research:
{search_results}

Analyze the competitive landscape and return ONLY valid JSON.

Return this structure:

{{
    "top_competitors": [
        {{
            "name": "",
            "website": "",
            "strengths": [],
            "weaknesses": []
        }}
    ],
    "market_gap": [],
    "pricing_insights": [],
    "recommendations": []
}}

Do not include markdown.

Return valid JSON only.
"""


def lead_prompt(
    company_name: str,
    industry: str,
    target_market: str,
    search_results: str,
) -> str:
    return f"""
You are a senior B2B sales intelligence consultant.

Company:
{company_name}

Industry:
{industry}

Target Market:
{target_market}

Latest Web Research:
{search_results}

Identify high-quality business leads that are likely to need the company's services.

Return ONLY valid JSON.

Structure:

{{
    "qualified_leads": [
        {{
            "company": "",
            "website": "",
            "industry": "",
            "estimated_size": "",
            "why_good_fit": "",
            "pain_points": [],
            "recommended_service": "",
            "priority": "High | Medium | Low"
        }}
    ]
}}

Rules:

- Recommend only companies that realistically fit the target market.
- Explain why each company is a good prospect.
- Infer likely business pain points from public information.
- Recommend the most relevant service.
- Return between 5 and 10 qualified leads.
- Do not include markdown.
- Return valid JSON only.
"""

def audit_prompt(company_name: str, website: str, analysis: dict) -> str:
    return f"""
You are a senior Website Audit and CRO consultant.

Company:
{company_name}

Website:
{website}

Website Analysis:
{analysis}

Analyze the website data and return ONLY valid JSON.

Return this structure:

{{
    "overall_score": 0,
    "seo_score": 0,
    "performance_score": 0,
    "ux_score": 0,
    "strengths": [],
    "weaknesses": [],
    "critical_issues": [],
    "recommendations": [],
    "recommended_services": []
}}

Rules:

- overall_score between 0 and 100
- Be objective.
- Use only the provided analysis.
- Return JSON only.
- No markdown.
"""


def opportunity_prompt(
    company_name: str,
    market: dict,
    competitors: dict,
    leads: dict,
    audit: dict,
) -> str:

    return f"""
You are a senior Business Growth Consultant.

Company:
{company_name}

Market Intelligence:
{market}

Competitor Analysis:
{competitors}

Lead Analysis:
{leads}

Website Audit:
{audit}

Your task is to combine ALL previous agent outputs into one strategic business plan.

Return ONLY valid JSON.

Return exactly:

{{
    "business_summary": "",

    "top_opportunities": [
        ""
    ],

    "best_target_industries": [
        ""
    ],

    "highest_value_services": [
        {{
            "service": "",
            "reason": "",
            "demand": "High | Medium | Low"
        }}
    ],

    "competitive_advantages": [
        ""
    ],

    "highest_priority_leads": [
        {{
            "company": "",
            "reason": "",
            "priority": "High | Medium | Low"
        }}
    ],

    "estimated_project_value": "",

    "recommended_next_steps": [
        ""
    ]
}}

Rules:

- Base recommendations only on the supplied analyses.
- Prioritize leads with the highest revenue potential.
- Recommend services with the strongest market demand.
- Do not invent unsupported facts.
- Return valid JSON only.
- No markdown.
"""


def outreach_prompt(
    company_name,
    opportunity,
):
    return f"""
You are an expert B2B Sales Consultant.

Company:

{company_name}

Business Intelligence:

{opportunity}

Create personalized outreach.

Return ONLY JSON.

{{
    "emails":[
        {{
            "company":"",
            "subject":"",
            "body":""
        }}
    ],

    "linkedin_messages":[
        {{
            "company":"",
            "message":""
        }}
    ],

    "cold_call_script":""
}}

No markdown.
JSON only.
"""