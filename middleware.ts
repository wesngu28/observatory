import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const { NEXT_PUBLIC_GITHUB_CLIENT_ID: githubClient, GITHUB_SECRET_ID: githubSecret, NEXT_PUBLIC_NODE_ENV } = process.env;

export async function middleware(req: NextRequest) {
  const response = NextResponse.next()
  const code = new URL(req.url).searchParams.get('code')
  const githubres = await fetch(`https://github.com/login/oauth/access_token?client_id=${githubClient}&client_secret=${githubSecret}&code=${code}`, {
      method: 'POST',
      headers: {
          accept: 'application/json'
      },
  })
  const auth_token = await githubres.json()
  response.cookies.set({
    name: "accessToken",
    httpOnly: true,
    value: auth_token.access_token,
    domain: NEXT_PUBLIC_NODE_ENV === 'production' ? "observatories.vercel.app" : "localhost",
    path: "/"
  })
  return response;
}

export const config = {
  matcher: '/api/callback',
}