# Observatory
A web interface for the [auto-star stargazing script](https://github.com/wesngu28/stargazing) that I made.

## Running Locally

```
git clone https://github.com/wesngu28/observatory.git
npm install
npm run dev
```

## Notes
This was a nice project to make and a good complement to the script I worked on previously. I really like the look of the base template you get from create-next-app, so I built the entire web app around the skeleton provided.

Something I learned was setting http cookies to store the provided github access token. Although still vulnerable, http cookies are more secure than other alternatives like session or local storage.

I also used useContext for the first time. It was a bit unnecessary but I now understand more of how it works.