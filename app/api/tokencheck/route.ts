import { Octokit } from "octokit";
import { cookies } from 'next/headers'

export async function GET() {
    const cookieStore = cookies()
    const accessToken = cookieStore.get('accessToken')
    if(accessToken && accessToken.value) {
        const octokit = new Octokit({
            auth: accessToken.value,
        })
        try {
            const username = await octokit.request('GET /user', {})
            return Response.json({
                success: true,
                user: username
            })
        } catch (err) {
            return Response.json({success: false})
        }
    } else {
        return Response.json({success: false})
    }
}
