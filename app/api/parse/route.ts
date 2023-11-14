import { Octokit } from "octokit";
import { cookies } from 'next/headers'

export async function POST() {
    const cookieStore = cookies()
    console.log("POSTER")
}
