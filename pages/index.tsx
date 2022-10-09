import Head from 'next/head'
import Heading from '../components/Heading'
import { useState } from 'react'
import { TableContext } from '../contexts/TableContext'

import Table from '../components/RepoTable'
import Footer from '../components/Footer'
import FileUpload from '../components/FileUpload'

interface Props {
  githubClientID: string;
}

export default function Home({ githubClientID }: Props) {

  const [table, setTable] = useState({} as any)
  const [login, setLogin] = useState('')

  return (
    <div className="flex w-full min-h-screen flex-1 flex-col items-center justify-center p-4 text-center">
      <Head>
        <title>Observatory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Heading />
      <TableContext.Provider value={{ table, setTable }}>
        <FileUpload cid={githubClientID} />
        <div className="w-[100vw] md:w-[50vw]">
          {table ? table.unstarredRepos ? <Table /> : null : null}
        </div>
      </TableContext.Provider>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  const { GITHUB_CLIENT_ID: githubClient } = process.env;
  return {
    props: {
      githubClientID: githubClient,
    },
  }
}
