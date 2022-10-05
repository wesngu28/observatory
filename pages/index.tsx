import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef, useState } from 'react'

const Home: NextPage = () => {

  const inputRef = useRef<HTMLInputElement>(null)
  const [currentFile, setCurrentFile] = useState('')

  const fileChange = (event: InputEvent) => {
    if (!(event.target! as HTMLInputElement).files && (event.target as HTMLInputElement).files![0]) {
      return;
    }
    const fileObj = (event.target! as HTMLInputElement).files && (event.target as HTMLInputElement).files![0]
    const fileExtension = fileObj!.name.split('.').pop()
    fileExtension === 'txt' || fileExtension === 'json' ? setCurrentFile(fileObj!.name) : setCurrentFile('Please select a valid file.') 
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-black">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to{' '}
          <a className="text-slate-400" href="https://nextjs.org">
            Observatory!
          </a>
        </h1>
        <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center" onClick={() => {
          inputRef.current!.click();
        }}><p className="text-slate-300">{currentFile ? currentFile : 'Weezy outta here'}</p>
        </button>
        <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center" onClick={async () => {
          const songQuery = await fetch('/api/initial/');
          const json = await songQuery.json()
          window.location.href = json.auth_url;
        }}><p className="text-slate-300">oh lawd connect me</p>
        </button>
        <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center" onClick={async () => {
          const songQuery = await fetch(`https://api.github.com/users/${window.location.href.replace('http://localhost:3000/?user=', '')}/starred`);
          const json = await songQuery.json()
          const starTest = await fetch(`https://api.github.com/user/starred/${json[0].owner.login}/${json[0].owner.name}`, {
            method: 'PUT',
          })
        }}><p className="text-slate-300">get stars</p>
        </button>
        <input
          style={{ display: 'none' }}
          ref={inputRef}
          type="file"
          onChange={fileChange}
        />
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}

export default Home
