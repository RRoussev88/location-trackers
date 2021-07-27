# Location Trackers

To run the project you need to take the following steps:

- Register in MApgl and create access token. Create `.env.local` file and create `REACT_APP_MAPBOX_TOKEN` entry with the token.
- Clone the repo and navigate to the project folder: `cd location-trackers`
- In the terminal run `npm install` to install required npm dependencies for the frontend project
- Navigate to src directory and build docker image in order to run Envoy proxy. Use the following command: `docker build -t location_trackers_envoy .`
- Run newly created docker container: `docker build -d --name location_trackers_envoy -p 8080:8080 -p 9901:9901 location_trackers_envoy`
- Cd in the server directory and run `npm install` again to install required dependencies for the server project
- Now we can run the server: `node ./location_trackers_server.js --db_path=./location_trackers_db.json`
- In another terminal open main project folder and run `npm start` to start frontend

Now open http://localhost:3000/ in a browser and enjoy
