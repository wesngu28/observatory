import { useEffect, useState, useContext } from "react";
import { TableContext } from "../contexts/TableContext";
import starTargetRepo from "../helper/starTargetRepo";

export default function Table() {

    const headings = ['Repository', 'Description', 'Stargazers']
    const [starStatus, setStarStatus] = useState('')
    const table = useContext(TableContext)

    useEffect(() => {
        setTimeout(() => {
            setStarStatus('');
          }, 5000)
    })

    return (
        <table className="m-auto p-4 text-left border-collapse table-fixed w-full">
            <caption className="p-4 m-4 text-lg">{starStatus}</caption>
            <thead>
                <tr className="pr-0">
                    {headings.map((item: string, idx) => {
                        return <th key={idx} className="font-bold text-center" title={item}>{item}</th>;
                    })}
                </tr>
                {table.table.unstarredRepos.map((arr: any, i: number) => {
                    return (
                        <tr key={i} className="pr-0">
                            <td key={arr.name + i} className="text-center p-2 md:p-6"><p><a className="text-gray-400 hover:underline" href={arr.url}>{arr.name}</a> <br /> <br /> by <a className="text-gray-600 hover:underline" href={arr.authorUrl}>{arr.author}</a> </p></td>
                            <td key={arr.description + i} className="text-center text-xs md:text-base p-2 md:p-6">{arr.description}</td>
                            <td key={arr.stargazers + i} className="text-center p-2 md:p-6">{arr.stargazers} <br /> <p className='opacity-25 hover:opacity-100' onClick={async (event) => setStarStatus(await starTargetRepo(event, arr.author, arr.name))}>⭐</p></td>
                        </tr>
                    );
                })}
            </thead>
        </table>
    );
}