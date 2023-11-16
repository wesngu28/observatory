import { cookies } from "next/headers";
import parse from "node-html-parser";
import { Octokit } from "octokit";
import { getStarredRepos } from "../../../helper/getStarredRepos";
import SimpleRepo from "../../../interfaces/SimpleRepo";
import { stringify } from "querystring";

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
                if (html.querySelector('#repository-link')) {
                    let repo = html.querySelector('#repository-link')!.text
                    if (repo.includes('/tree')) repo = repo.slice(0, repo.indexOf('/tree'))
                    if (repo.includes('github.com/')) packageList.push(repo.replace('github.com/', ''))
                }
            }
        }
        if (extension.includes('.txt')) {
            const textSplit = (await new Response(req.body!).text()).split("\n");
            const pypiPackages: string[] = textSplit.map((requirement: string) => {
                const equals = requirement.indexOf('=')
                const equalToEnd = requirement.substring(equals, requirement.length)
                requirement = requirement.replace(equalToEnd, '')
                return requirement
            })
            for (let i = 0; i < pypiPackages.length; i++) {
                const pipName = `https://pypi.org/project/${pypiPackages[i]}`
                const response = await fetch(`https://pypi.org/project/${pypiPackages[i]}`);
                const text = await response.text();
                const html = parse(text);
                const github = html.querySelector('.github-repo-info')?.getAttribute('data-url')
                if (github) packageList.push(github.replace('https://api.github.com/repos/', ''))
                else {
                    if (pipName.replace('https://pypi.org/project/', '')) {
                        const queryString = stringify({
                            q: `${pipName.replace('https://pypi.org/project/', '')} in:name language:python`,
                            sort: 'stars',
                            order: 'desc',
                        })
                        const potentialGithub = await octokit.request(`GET /search/repositories?${queryString}`)
                        const potentialGithubUrl = potentialGithub.data.items[0].full_name
                        packageList.push(potentialGithubUrl)
                    }
                }
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
    } catch (err: any) {
        return new Response(err, {status: 500})
    }
}
