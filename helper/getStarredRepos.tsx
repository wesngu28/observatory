import { Octokit } from "octokit"
import Repo from "../interfaces/Repo"

export const getStarredRepos = async (username: string, octokit: Octokit) => {
    let page = 1;
    let starredRepoList: string[] = [];
    try {
      while (true) {
        const repos = await octokit.request(`GET /users/${username}/starred`, {
          page: page,
          per_page: 100,
        });
  
        const repoUrls = repos.data.map((repo: Repo) => repo.html_url);
        starredRepoList = [...starredRepoList, ...repoUrls];
  
        const linkHeader = repos.headers.link;
        if (!linkHeader || !linkHeader.includes('rel="next"')) {
          break;
        }
        page++;
      }
    } catch (error) {
      console.error("Error fetching starred repos:", error);
    }
    return starredRepoList.map(repoUrl => repoUrl.toLowerCase());
  };