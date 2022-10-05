import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const { GITHUB_CLIENT_ID: githubClient, GITHUB_SECRET_ID: githubSecret } = process.env;


const callback = async (req: NextApiRequest, res: NextApiResponse) => {
    const code = req.query.code;
    const body = {
        client_id: githubClient,
        client_secret: githubSecret,
        code: code
      };
    const response = await fetch(`https://github.com/login/oauth/access_token?client_id=${githubClient}&client_secret=${githubSecret}&code=${code}`, {
        method: 'POST',
        headers: {
            accept: 'application/json'
        },
    })
    const auth_token = await response.json()

    res.setHeader('Set-Cookie', [
        `accessToken=${auth_token.access_token}; HTTPOnly; Max-Age=${60000*24}`
    ])

    const octokit = new Octokit({
        auth: auth_token.access_token
      })
      
    const doges = await octokit.request('GET /user', {})
    const response2 = await fetch(`https://api.github.com/user`, {
        credentials: 'include'
    });
    const username = await response2.json()
    console.log(doges)

    res.redirect(`http://localhost:3000/?user=${doges.data.login}`);
}

export default callback