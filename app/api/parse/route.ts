import { cookies } from "next/headers";
import parse from "node-html-parser";
import { Octokit } from "octokit";
import { getStarredRepos } from "../../../helper/getStarredRepos";
import SimpleRepo from "../../../interfaces/SimpleRepo";

export async function POST(req: Request) {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    try {
        const octokit = new Octokit({
            auth: accessToken?.value
        })
        let packageList: string[] = []
        const extension = new URL(req.url).searchParams.get("ext")!;
        if (extension.includes('.json')) {
            const json = await req.json()
            const npmPackages: string[] = [];
            if (json.dependencies) {
                Object.keys(json.dependencies).forEach(dependency => npmPackages.push(`https://www.npmjs.com/package/${dependency}`))
            }
            if (json.devDependencies) {
                Object.keys(json.devDependencies).forEach(dependency => npmPackages.push(`https://www.npmjs.com/package/${dependency}`))
            }
            for (let i = 0; i < npmPackages.length; i++) {
                const response = await fetch(npmPackages[i]);
                const text = await response.text();
                const html = parse(text);
                packageList.push(html.querySelector('#repository-link')!.text.replace('github.com/', ''))
            }
        }
        packageList = packageList.filter(pack => pack)
        const username = await octokit.request('GET /user', {})
        const starredRepos = await getStarredRepos(username.data.login, octokit)
        let gitHubUrls = Array.from(new Set(packageList.map(dependency => `https://github.com/${dependency}`).filter(repo => repo)))
        const unstarredRepos: Array<SimpleRepo> = []
        for (let i = 0; i < gitHubUrls.length; i++) {
            if (!starredRepos.includes(gitHubUrls[i].toLowerCase())) {
                const repoDetails = await octokit.request(`GET /repos/${gitHubUrls[i].replace('https://github.com/', '')}`)
                unstarredRepos.push({
                    name: repoDetails.data.name,
                    author: repoDetails.data.owner.login,
                    description: repoDetails.data.description,
                    url: repoDetails.data.html_url,
                    authorUrl: repoDetails.data.owner.html_url,
                    stargazers: repoDetails.data.stargazers_count
                })
            }
        }
        return Response.json(unstarredRepos)
    } catch (err) {
        console.log(err)
    }
    return Response
}
