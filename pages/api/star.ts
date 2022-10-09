import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const star = async (req: NextApiRequest, res: NextApiResponse) => {
    
    const octokit = new Octokit({
        auth: req.cookies.accessToken
    })
    
    if (req.method === 'PUT') {
        await octokit.request('PUT /user/starred/{owner}/{repo}', {
            owner: String(req.query.author),
            repo: String(req.query.name)
          })
    }

    if (req.method === 'DELETE') {
        await octokit.request('DELETE /user/starred/{owner}/{repo}', {
            owner: String(req.query.author),
            repo: String(req.query.name)
          })
    }

    res.status(200).send(
        `Successfully ${req.method === 'PUT' ? 'starred' : 'unstarred'} ${req.query.name}`
    );
}

export default star
