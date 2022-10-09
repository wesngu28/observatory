import { SyntheticEvent } from "react";

export default async function starTargetRepo(event: SyntheticEvent, owner: string, repoName: string) {
    if(event.currentTarget.classList.contains("opacity-25")) {
        event.currentTarget.classList.add("opacity-100")
        event.currentTarget.classList.remove("opacity-25")
        const starMe = await fetch(`/api/star?name=${repoName}&author=${owner}`, {
            method: 'PUT',
            credentials: 'include'
        })
        const starResult = starMe.text();
        return starResult;
    } else {
        event.currentTarget.classList.add("opacity-25")
        event.currentTarget.classList.remove("opacity-100")
        const unStarMe = await fetch(`/api/star?name=${repoName}&author=${owner}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        const starResult = unStarMe.text();
        return starResult;
    }
}