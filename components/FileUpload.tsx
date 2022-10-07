import { useRef, useState } from 'react'

export default function FileUpload() {

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

        <>
            <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center" onClick={() => {
                inputRef.current!.click();
            }}><p className="text-slate-300">{currentFile ? currentFile : 'Weezy outta here'}</p>
            </button>

            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                onChange={fileChange}
            />
        </>

    )
}