"use client"
import Heading from '../components/Heading'
import { useContext, useEffect, useState } from 'react'
import { TableContext } from '../contexts/TableContext'

import Table from '../components/RepoTable'
import Footer from '../components/Footer'
import FileUpload from '../components/FileUpload'

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
    <div className="flex w-full flex-1 flex-col items-center justify-center p-4 text-center">
      <Heading />
      <FileUpload logged={logged} cid={process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID} />
      <div className="w-[100vw] md:w-[50vw]">
        <Table table={table ? table.table : []} />
      </div>
      <Footer />
    </div>
  )
}