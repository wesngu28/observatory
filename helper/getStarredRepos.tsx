import { Octokit } from "octokit"
import Repo from "../interfaces/Repo"

export const getStarredRepos = async (username: string, octokit: Octokit) => {
    const repos = await octokit.request(`GET /users/${username}/starred`)
    const starredRepoList = repos.data.map((repo: Repo) => { return repo.html_url })
    for (let i = 0; i < 10000; i++) {
        const checkForMoreThanOneHundred = await octokit.request(`GET /users/${username}/starred?page=${i}`)
        if(checkForMoreThanOneHundred.data[0]) {
            checkForMoreThanOneHundred.data.forEach((repo: Repo) => {
                if(!starredRepoList.includes(repo.html_url)) {
                    starredRepoList.push(repo.html_url)
                }
            });
        } else {
            i = 10001;
        }
    }
    return starredRepoList;
}