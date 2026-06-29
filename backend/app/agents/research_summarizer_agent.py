class ResearchSummarizerAgent:

    def __init__(self):
        self.name = "Research Summarizer"

    async def run(self, knowledge):

        shared = {}

        for category, items in knowledge.items():

            merged = []

            for item in items:

                merged.extend(item["results"])

            shared[category] = merged

        return shared