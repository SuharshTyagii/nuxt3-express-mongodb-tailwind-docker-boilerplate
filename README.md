## The simplest way to start the app is via Docker. Make sure you have docker and docker-compose installed on your machine. 

----------------

### Note -- **Make sure to uncomment the API_BASE variable in the .env file of "ui" folder.**

*On Windows*
```bash
docker-compose up --build
```

If the above doesn't work, please try
```bash
API_BASE=http://localhost:8082 docker-compose up --build
```

## The application runs at http://localhost:3001 by default.


*On Linux*
```bash
docker compose up --build
```

# Features:-
- Built with MongoDB, NodeJS(Express) and Nuxt 3.
- Completely containerized application with the ability to deploy via one line of code on any remote servers.
- 3 seperate containers for MongoDB server, backend, and UI.


## Non-docker based local setup:-

# UI
Make sure you are in the UI folder.
Here, please uncomment the API_BASE in the .env file inside the UI folder. Then run (one after the other):-

```bash
npm install
npm run build
npm run generate
npm run preview
```

# Database
Please make sure to have mongo server running on your local machine. 
You can verify this by navigating to
- C:\Program Files\MongoDB\Server\5.0\bin

And then opening up a command prompt window and run:-
```bash
./mongo.exe
```


# Server
Navigate to the server folder from the root directory.
- /gohighlevel_assignment/server

Then:-
```bash
npm run install
```

```bash
npm run dev
```

Now the application should be fully operational at http://localhost:3001

**The production app is live at http://68.183.81.108:3001/ on a digitalocean node till 23rd of July 2023** 