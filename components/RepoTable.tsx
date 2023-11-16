"use client";

import { useEffect, useState } from "react";
import starTargetRepo from "../helper/starTargetRepo";
import SimpleRepo from "../interfaces/SimpleRepo";

interface Props {
    table: Array<SimpleRepo | string>
}

export default function Table({table}: Props) {

    const headings = ['Repository', 'Description', 'Stargazers']
    const [starStatus, setStarStatus] = useState('')

    useEffect(() => {
        setTimeout(() => {
            setStarStatus('');
        }, 5000)
    })

    return (
        table && table.length > 0 ? typeof table[0] !== "string" ? 
        <table className="m-auto p-4 text-left border-collapse table-fixed w-full">
            <caption className="p-4 m-4 text-lg">{starStatus}</caption>
            <thead>
                <tr className="pr-0">
                    {headings.map((item: string, idx) => {
                        return <th key={idx} className="font-bold text-center" title={item}>{item}</th>;
                    })}
                </tr>
                {(table as Array<SimpleRepo>).map((repo: SimpleRepo, i: number) => {
                    return (
                        <tr key={i} className="pr-0">
                            <td key={repo.name + i} className="text-center p-2 md:p-6"><p><a className="text-gray-400 hover:underline" href={repo.url}>
                                {repo.name}</a> <br /> <br /> by <a className="text-gray-600 hover:underline" href={repo.authorUrl}>{repo.author}</a> </p></td>
                            <td key={repo.description + i} className="text-center text-xs md:text-base p-2 md:p-6">{repo.description}</td>
                            <td key={repo.stargazers + i} className="text-center p-2 md:p-6">{repo.stargazers} <br /> 
                                <p className={`${repo.starred === true ? 'opacity-100 hover:opacity-25' : 'opacity-25 hover:opacity-100'}`} 
                            onClick={async (event) => setStarStatus(await starTargetRepo(event, repo.author, repo.name))}>⭐</p></td>
                        </tr>
                    );
                })}
            </thead>
        </table> : <p>{table[0]}</p> : null
    );
}