"use client"
import Head from 'next/head'
import Heading from '../components/Heading'
import { useContext, useEffect, useState } from 'react'
import { TableContext, TableContextProvider } from '../contexts/TableContext'

import Table from '../components/RepoTable'
import Footer from '../components/Footer'
import FileUpload from '../components/FileUpload'
import SimpleRepo from '../interfaces/SimpleRepo'

async function checkToken() {
  const token = await fetch('/api/tokencheck', { credentials: 'include' })
  const result: { success: boolean } = await token.json()
  return result;
}

export default function Home() {

  const [logged, setLogged] = useState(false)
  const table = useContext(TableContext)

  useEffect(() => {
    async function token() {
      const status = await checkToken()
      setLogged(status.success)
    }
    token()
  })

  return (
    <div className="flex w-full min-h-screen flex-1 flex-col items-center justify-center p-4 text-center">
      <Head>
        <title>Observatory</title>
        <meta charSet="UTF-8" />
        <meta name="rating" content="general" />
        <meta name="lang" content="en-us" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Find your unstarred repositories and become a stargazer" />
        <meta property="og:description" content="Insert your requirements.txt and package.json and support your favorite repositories." />
        <meta property="og:image" content="/observatory-conner-baker-unsplash.jpg" />
        <meta name="twitter:title" content="Find your unstarred repositories and become a stargazer" />
        <meta name="twitter:description" content="Insert your requirements.txt and package.json and support your favorite repositories." />
        <meta name="twitter:image" content="/observatory-conner-baker-unsplash.jpg" />
        <meta name="twitter:creator" content="wesngu28" />
        <meta name="keywords" content="github, star" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <Heading />
      <TableContextProvider>
        <FileUpload logged={logged} cid={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID} />
        {logged ? "Hello logged in" : "Get out"}
        <div className="w-[100vw] md:w-[50vw]">
          <Table />
        </div>
      </TableContextProvider>
      <Footer />
    </div>
  )
}