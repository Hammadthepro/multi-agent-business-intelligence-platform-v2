from app.services.tavily_service import search_web

results = search_web(
    "Shopify Agency USA ecommerce trends"
)

print("\n===== SEARCH RESULTS =====\n")

for result in results:
    print("Title :", result.get("title"))
    print("URL   :", result.get("url"))
    print("Content:")
    print(result.get("content"))
    print("-" * 80)