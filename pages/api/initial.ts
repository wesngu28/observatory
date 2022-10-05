import { NextApiRequest, NextApiResponse } from "next";

const { GITHUB_CLIENT_ID: githubClient, GITHUB_SECRET_ID: githubSecret } = process.env;


const initial = async (req: NextApiRequest, res: NextApiResponse) => {
    return res.status(200).json({
        auth_url: `https://github.com/login/oauth/authorize?client_id=${githubClient}`
    })
}

export default initial