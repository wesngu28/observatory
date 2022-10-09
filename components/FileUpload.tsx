import { useContext, useRef, useState } from 'react'
import { TableContext } from '../contexts/TableContext'
export default function FileUpload() {

    const inputRef = useRef<HTMLInputElement>(null)
    const [currentFileName, setCurrentFileName] = useState('')
    const [currentFile, setCurrentFile] = useState<File>()
    const { setTable } = useContext(TableContext)

    const fileChange = async (event: InputEvent) => {
        if (!(event.target! as HTMLInputElement).files && (event.target as HTMLInputElement).files![0]) {
            return;
        }
        const fileObj = (event.target! as HTMLInputElement).files && (event.target as HTMLInputElement).files![0]
        const fileExtension = fileObj!.name.split('.').pop()
        fileExtension === 'txt' || fileExtension === 'json' ? setCurrentFileName(fileObj!.name) : setCurrentFileName('Please select a valid file.')
        fileExtension === 'txt' || fileExtension === 'json' ? setCurrentFile(fileObj!) : null
    }

    async function parseFile(file: File, fileExtension: string) {
        setTable({})
        const repoList = await fetch(`/api/parse?ext=${fileExtension}`,
            {
                method: 'POST',
                body: currentFile,
                credentials: 'include'
            }
        );
        const repoListJson = await repoList.json()
        setTable(repoListJson)
    }

    return (
        <>
            <div className="p-4 flex items-center">
                <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center font-bold" onClick={() => {
                    inputRef.current!.click();
                }}><p className="text-slate-300">{currentFileName ? currentFileName : 'Upload a File'}</p>
                </button>

                <input
                    style={{ display: 'none' }}
                    ref={inputRef}
                    type="file"
                    onChange={fileChange}
                />

                <button disabled={currentFile ? false : true} className={`${currentFile ? 'bg-slate-400' : 'bg-slate-800'} w-max h-6 rounded-lg border-none px-4 py-2 flex items-center justify-center`} onClick={
                    () => parseFile(currentFile!, `.${currentFileName.split('.').pop()!}`)
                }
                ><p className="text-slate-700">{currentFile ? 'Submit' : 'Submit'}</p>
                </button>
            </div>
        </>

    )
}