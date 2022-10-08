interface Props {
    cid?: string;
}

export default function Buttons({cid}: Props) {
    return (
        <>
            <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center" onClick={async () => {
                window.location.href = `https://github.com/login/oauth/authorize?scope=public_repo&client_id=${cid}`;
            }}>
                <p className="text-slate-300">oh lawd connect me</p>
            </button>
        </>
    )
}