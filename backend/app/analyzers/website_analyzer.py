import requests
from bs4 import BeautifulSoup


class WebsiteAnalyzer:

    def analyze(self, url: str):

        response = requests.get(
            url,
            timeout=15,
            headers={
                "User-Agent": (
                    "Mozilla/5.0 "
                    "(Windows NT 10.0; Win64; x64)"
                )
            },
        )

        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.title.string.strip() if soup.title else ""

        meta = soup.find(
            "meta",
            attrs={"name": "description"},
        )

        meta_description = ""

        if meta:
            meta_description = meta.get("content", "")

        h1 = [
            x.get_text(strip=True)
            for x in soup.find_all("h1")
        ]

        h2 = [
            x.get_text(strip=True)
            for x in soup.find_all("h2")
        ]

        images = soup.find_all("img")

        missing_alt = 0

        for image in images:

            if not image.get("alt"):

                missing_alt += 1

        internal_links = []

        external_links = []

        for a in soup.find_all("a", href=True):

            href = a["href"]

            if href.startswith("/"):

                internal_links.append(href)

            elif href.startswith("http"):

                external_links.append(href)

        return {
            "title": title,
            "meta_description": meta_description,
            "h1_count": len(h1),
            "h2_count": len(h2),
            "images": len(images),
            "missing_alt": missing_alt,
            "internal_links": len(internal_links),
            "external_links": len(external_links),
        }


website_analyzer = WebsiteAnalyzer()