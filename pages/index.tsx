import Head from 'next/head'
import Buttons from '../components/Buttons'
import FileUpload from '../components/FileUpload'
import Heading from '../components/Heading'

interface Props {
  githubClientID: string;
}

export default function Home ({githubClientID}: Props) {

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-black">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
        <Heading />
        <FileUpload />
        <Buttons cid={githubClientID}/>
      </main>

      <footer className="flex h-24 w-full items-center justify-center border-t">
        <a
          className="flex items-center justify-center gap-2"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          Some Idiot in Seattle
        </a>
      </footer>
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
