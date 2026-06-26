from fastapi import APIRouter
from app.orchestrator.analysis_pipeline import pipeline

from app.schemas.request import AnalysisRequest
from app.schemas.response import AnalysisResponse

router = APIRouter()


@router.get("/")
async def root():
    return {"message": "Business Intelligence API"}


@router.get("/health")
async def health():
    return {"status": "healthy"}


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze(request: AnalysisRequest):

    results = await pipeline.run(request)

    return AnalysisResponse(
        success=True,
        message="Analysis complete",
        data=results,
    )