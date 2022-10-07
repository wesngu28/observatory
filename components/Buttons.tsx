export default function Buttons() {
    return (
        <>
            <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center" onClick={async () => {
                const songQuery = await fetch('/api/initial/');
                const json = await songQuery.json()
                window.location.href = json.auth_url;
            }}><p className="text-slate-300">oh lawd connect me</p>
            </button>
            <button className="bg-slate-600 w-max h-6 rounded-lg m-4 border-none px-8 py-4 flex items-center justify-center" onClick={async () => {
                const songQuery = await fetch(`https://api.github.com/users/${window.location.href.replace('http://localhost:3000/?user=', '')}/starred`);
                const json = await songQuery.json()
                const sta = await fetch('/api/stars/')
                // const starTest = await fetch(`https://api.github.com/user/starred/${json[0].owner.login}/${json[0].owner.name}`, {
                //   method: 'PUT',
                //   credentials: 'include'
                // })
            }}><p className="text-slate-300">get stars</p>
            </button>
        </>
    )
}