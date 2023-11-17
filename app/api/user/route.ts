import { cookies } from "next/headers";
import { Octokit } from "octokit";
import { getStarredRepos } from "../../../helper/getStarredRepos";
import SimpleRepo from "../../../interfaces/SimpleRepo";

export async function GET(req: Request) {
  try {
    const cookieStore = cookies();
    const accessToken = cookieStore.get("accessToken");
    const octokit = new Octokit({
      auth: accessToken?.value,
    });
    const user = new URL(req.url).searchParams.get("user");
    const username = await octokit.request("GET /users/{user}", { user: user });
    const starredRepos = await getStarredRepos(username.data.login, octokit);
    const me = await octokit.request("GET /user", {});
    const meRepos = await getStarredRepos(me.data.login, octokit);
    const repoReturn: Array<SimpleRepo> = [];
    for (let i = 0; i < starredRepos.length; i++) {
      const repoDetails = await octokit.request(
        `GET /repos/${starredRepos[i].replace("https://github.com/", "")}`
      );
      repoReturn.push({
        name: repoDetails.data.name,
        author: repoDetails.data.owner.login,
        description: repoDetails.data.description,
        url: repoDetails.data.html_url,
        authorUrl: repoDetails.data.owner.html_url,
        stargazers: repoDetails.data.stargazers_count,
        starred: meRepos.includes(starredRepos[i]) ? true : false,
      });
    }
    return Response.json(repoReturn);
  } catch (err: any) {
    return new Response(err, { status: 500 });
  }
}
