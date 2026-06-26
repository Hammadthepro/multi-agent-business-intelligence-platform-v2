from app.services.groq_service import ask_groq

print(
    ask_groq(
        "Say hello in one sentence."
    )
)