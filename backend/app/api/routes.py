from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def home():
    return {
        "message": "Sentient AI Backend Running 🚀"
    }


@router.get("/health")
def health():
    return {
        "status": "healthy"
    }