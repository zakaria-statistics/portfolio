from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
from collections import Counter

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for simplicity in this portfolio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GITHUB_USERNAME = "zakaria-statistics"

@app.get("/stats")
def get_github_stats():
    try:
        # Fetch user profile for followers/following
        user_url = f"https://api.github.com/users/{GITHUB_USERNAME}"
        user_response = requests.get(user_url)
        user_response.raise_for_status()
        user_data = user_response.json()

        # Fetch public repositories
        repo_url = f"https://api.github.com/users/{GITHUB_USERNAME}/repos"
        repo_response = requests.get(repo_url)
        repo_response.raise_for_status()
        repos = repo_response.json()

        languages = []
        total_stars = 0
        total_forks = 0
        
        for repo in repos:
            if repo["language"]:
                languages.append(repo["language"])
            total_stars += repo["stargazers_count"]
            total_forks += repo["forks_count"]

        # Calculate language usage
        lang_counts = Counter(languages)
        total_repos = len(repos)
        
        # Filter Infra Projects
        infra_keywords = ["infra", "terraform", "docker", "kubernetes", "k8s", "cloud", "aws", "azure", "devops", "ansible", "linux", "bash", "shell", "scripting", "ci/cd", "jenkins", "gitlab"]
        infra_repos = [
            repo for repo in repos
            if any(keyword in (repo["description"] or "").lower() or keyword in repo["name"].lower() for keyword in infra_keywords)
        ]

        # Calculate Infra Stats
        infra_languages = []
        infra_stars = 0
        infra_forks = 0
        
        for repo in infra_repos:
            if repo["language"]:
                infra_languages.append(repo["language"])
            infra_stars += repo["stargazers_count"]
            infra_forks += repo["forks_count"]

        infra_lang_counts = Counter(infra_languages)

        # Format for frontend
        stats = {
            "username": GITHUB_USERNAME,
            "total_repos": total_repos,
            "total_stars": total_stars,
            "total_forks": total_forks,
            "followers": user_data.get("followers", 0),
            "following": user_data.get("following", 0),
            "languages": dict(lang_counts),
            "infra_stats": {
                "total_repos": len(infra_repos),
                "total_stars": infra_stars,
                "total_forks": infra_forks,
                "languages": dict(infra_lang_counts)
            },
            "infra_projects": [
                {
                    "name": repo["name"],
                    "description": repo["description"],
                    "stars": repo["stargazers_count"],
                    "language": repo["language"],
                    "url": repo["html_url"]
                }
                for repo in infra_repos
            ]
        }
        
        return stats
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
