from abc import ABC, abstractmethod
import time


class BaseAgent(ABC):
    def __init__(self, name: str):
        self.name = name

    async def execute(self, request, context):
        start = time.perf_counter()

        try:
            data = await self.run(request, context)

            execution_time = round(time.perf_counter() - start, 2)

            return {
                "agent": self.name,
                "status": "completed",
                "execution_time": execution_time,
                "data": data,
            }

        except Exception as e:
            execution_time = round(time.perf_counter() - start, 2)

            return {
                "agent": self.name,
                "status": "failed",
                "execution_time": execution_time,
                "error": str(e),
            }

    @abstractmethod
    async def run(self, request, context):
        pass