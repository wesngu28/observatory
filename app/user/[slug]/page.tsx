"use client";
import { useEffect, useState } from "react";

import Footer from "../../../components/Footer";
import Table from "../../../components/RepoTable";
import Heading from "../../../components/Heading";

async function checkToken() {
  const token = await fetch("/api/tokencheck", { credentials: "include" });
  const result: { success: boolean } = await token.json();
  return result;
}

export default function Home({ params }: { params: { slug: string } }) {
  const [table, setTable] = useState([]);

  useEffect(() => {
    async function token() {
      const status = await checkToken();
      if (status.success === false)
        window.location.href = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID}`;
      const testa = await fetch(`/api/user?user=${params.slug}`);
      const json = await testa.json();
      setTable(json);
    }
    token();
  }, []);

  return (
    <div className="flex w-full flex-1 flex-col items-center justify-center p-4 text-center">
      <Heading />
      <h2 className="text-3xl md:text-xl font-bold mt-12">
        Viewing <a className="text-slate-400">{params.slug}</a>'s starred
        repositories
      </h2>
      <div className="w-[100vw] md:w-[50vw]">
        <Table table={table} />
      </div>
      <Footer />
    </div>
  );
}
