class ContextBuilder:

    def build(self, request):
        return {
            "context": f"""
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
        }