# Observatory
A web interface for the [auto-star stargazing script](https://github.com/wesngu28/stargazing) that I made.

## Running Locally

```
git clone https://github.com/wesngu28/observatory.git
npm install
```

You then must visit the developer settings in your [Github](https://github.com/settings/developers) and create a new oauth app. Name it whatever, but change it's homepage url to http://localhost:3000 and its callback to http://localhost:3000/api/callback. 

Create a file named .env.local in the root of the repository and create three environment variables, GITHUB_CLIENT_ID, GITHUB_SECRET_ID, and NODE_ENV. Set the client and secret ID to the ones in your oauth app's general settings (you will have to generate a secret ID) and set the node env to development. Now, you should be able to run it with:

```
npm run dev
```

## Notes
This was a nice project to make and a good complement to the script I worked on previously. I really like the look of the base template you get from create-next-app, so I built the entire web app around the skeleton provided.

Something I learned was setting http cookies to store the provided github access token. Although still vulnerable, http cookies are more secure than other alternatives like session or local storage.

I also used useContext for the first time. It was a bit unnecessary but I now understand more of how it works.