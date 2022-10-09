import { NextApiRequest, NextApiResponse } from "next";
import { Octokit } from "octokit";

const test = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.cookies.accessToken) {
        const octokit = new Octokit({
            auth: req.cookies.accessToken,
        })
        try {
            const username = await octokit.request('GET /user', {})
            res.status(200).json( { success: true } )
        } catch (err) {
            res.status(200).json( { success: false } )
        }
    } else {
        res.status(200).json( { success: false } )
    }
}

export default test
