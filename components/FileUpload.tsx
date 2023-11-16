"use client";

import { SyntheticEvent, useContext, useRef, useState } from 'react'
import { TableContext } from '../contexts/TableContext'
interface Props {
    logged: boolean;
    cid?: string;
}

export default function FileUpload({ logged, cid }: Props) {

    const inputRef = useRef<HTMLInputElement>(null)
    const [currentFileName, setCurrentFileName] = useState('')
    const [currentFile, setCurrentFile] = useState<File>()
    const table = useContext(TableContext)

    const fileChange = async (event: SyntheticEvent) => {
        if (!(event.target! as HTMLInputElement).files && (event.target as HTMLInputElement).files![0]) {
            return;
        }
        const fileObj = (event.target! as HTMLInputElement).files && (event.target as HTMLInputElement).files![0]
        const fileExtension = fileObj!.name.split('.').pop()
        fileExtension === 'txt' || fileExtension === 'json' ? setCurrentFileName(fileObj!.name) : setCurrentFileName('Please select a valid file.')
        fileExtension === 'txt' || fileExtension === 'json' ? setCurrentFile(fileObj!) : null
    }

    async function parseFile(fileExtension: string) {
        table?.setTable([])
        if (!logged) window.location.href = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${cid}`;
        const repoList = await fetch(`/api/parse?ext=${fileExtension}`,
            {
                method: 'POST',
                body: currentFile,
                credentials: 'include'
            }
        );
        const repoListJson = await repoList.json()
        if(repoListJson.error) {
            table?.setTable("Error")
        } else {
            table?.setTable(repoListJson)
        }
    }

    return (
        <>
            <div className="flex items-center flex-col">
                <div className="flex items-center p-4">
                    {logged ? 
                        <>
                        <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center font-bold" onClick={() => {
                            inputRef.current!.click();
                        }}><p className="text-slate-300">{currentFileName ? currentFileName : 'Upload a File'}</p>
                        </button>

                        <input
                            style={{ display: 'none' }}
                            ref={inputRef}
                            type="file"
                            onChange={(event) => fileChange(event)}
                        />

                        <button disabled={currentFile ? false : true} className={`${currentFile ? 'bg-slate-400' : 'bg-slate-800'} w-max h-6 rounded-lg border-none px-4 py-2 flex items-center justify-center`} onClick={
                            () => parseFile(`.${currentFileName.split('.').pop()!}`)
                        }
                        ><p className="text-slate-700">{currentFile ? 'Submit' : 'Submit'}</p>
                        </button>
                        </>    
                    : <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center font-bold" onClick={() => parseFile(`.${currentFileName.split('.').pop()!}`)}><p className="text-slate-300">Log In</p>
                    </button>}
                </div>
                {table?.table && table.table.length === 0 ? <p>Getting repositories...</p> : null}
            </div>
        </>

    )
}