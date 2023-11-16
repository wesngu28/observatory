import { cookies } from "next/headers";
import { Octokit } from "octokit";

export async function PUT (req: Request) {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    const octokit = new Octokit({
        auth: accessToken?.value
    })

    const params = new URL(req.url)
    await octokit.request('PUT /user/starred/{owner}/{repo}', {
        owner: String(params.searchParams.get('author')),
        repo: String(params.searchParams.get('name'))
    })

    return new Response(`Successfuly starred ${String(params.searchParams.get('name'))}`, {
        status: 200
    })
}

export async function DELETE(req: Request) {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    const octokit = new Octokit({
        auth: accessToken?.value
    })
    const params = new URL(req.url)
    await octokit.request('DELETE /user/starred/{owner}/{repo}', {
        owner: String(params.searchParams.get('author')),
        repo: String(params.searchParams.get('name'))
    })

    return new Response(`Successfuly unstarred ${String(params.searchParams.get('name'))}`, {
        status: 200
    })
}