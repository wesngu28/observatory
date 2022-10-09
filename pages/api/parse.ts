import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";
import { Octokit } from "octokit";
import querystring from 'query-string'
import { getStarredRepos } from "../../helper/getStarredRepos";

const parseRepo = async (req: NextApiRequest, res: NextApiResponse) => {
    const octokit = new Octokit({
        auth: req.cookies.accessToken
    })
    let packageList: string[] = []
    if (req.query.ext!.includes('.json')) {
        const dependencies = Object.keys(req.body.dependencies)
        const devDependencies = Object.keys(req.body.devDependencies)
        const npmPackages: string[] = [];
        dependencies.forEach(dependencies => {
            npmPackages.push(`https://www.npmjs.com/package/${dependencies}`)
        })
        devDependencies.forEach(devDependency => {
            npmPackages.push(`https://www.npmjs.com/package/${devDependency}`)
        })
        const npmPackagefmt = npmPackages.map(async (dependency: string) => {
            const response = await fetch(dependency);
            const text = await response.text();
            const html = parse(text);
            return html.querySelector('#repository-link')!.text.replace('github.com/', '')
        })
        packageList = await Promise.all(npmPackagefmt);
    }
    if (req.query.ext!.includes('.txt')) {
        const textSplit = req.body.toString().split("\n");
        const pypiPackages: string[] = textSplit.map((requirement: string) => {
            const equals = requirement.indexOf('=')
            const equalToEnd = requirement.substring(equals, requirement.length)
            requirement = requirement.replace(equalToEnd, '')
            return requirement
        })
        const pipPackagefmt = pypiPackages.map(async (pipPackage) => {
            const pipName = `https://pypi.org/project/${pipPackage}`
            const response = await fetch(`https://pypi.org/project/${pipPackage}`);
            const text = await response.text();
            const html = parse(text);
            const github = html.querySelector('.github-repo-info')?.getAttribute('data-url')
            if (github) return github.replace('https://api.github.com/repos/', '')
            if (!pipName.replace('https://pypi.org/project/', '')) return
            const queryString = querystring.stringify({
                q: `${pipName.replace('https://pypi.org/project/', '')} in:name`,
                sort: 'stars',
                order: 'desc',
            })
            const potentialGithub = await octokit.request(`GET /search/repositories?${queryString}`)
            const potentialGithubUrl = potentialGithub.data.items[0].full_name
            return potentialGithubUrl
        })
        packageList = await Promise.all(pipPackagefmt);
    }
    packageList = packageList.filter(repo => repo !== undefined)
    const username = await octokit.request('GET /user', {})
    const starredRepos = await getStarredRepos(username.data.login, octokit)
    let gitHubUrls = packageList.map((dependency: string) => {
        return `https://github.com/${dependency}`
    }).filter(repo => repo !== undefined)
    const removeDuplicate = [...new Set(gitHubUrls)]
    gitHubUrls = Array.from(removeDuplicate)
    const getUnstarredRepos = gitHubUrls.map(async (dependency: string, idx: number) => {
        if (!starredRepos.includes(dependency!)) {
            const repoDetails = await octokit.request(`GET /repos/${dependency.replace('https://github.com/', '')}`)
            const repo = {
                name: repoDetails.data.name,
                author: repoDetails.data.owner.login,
                description: repoDetails.data.description,
                url: repoDetails.data.html_url,
                authorUrl: repoDetails.data.owner.html_url,
                stargazers: repoDetails.data.stargazers_count
            }
            return repo;
        }
    })
    let unstarredRepos = await Promise.all(getUnstarredRepos)
    unstarredRepos = unstarredRepos.filter(repo => repo !== undefined)
    return res.status(200).json({
        unstarredRepos
    })
}

export default parseRepo