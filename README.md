# primary-bid-tech-test
## Getting Started
### API
The API can be ran in two ways, locally, or within a docker container.

**Docker setup**

Change directory to API

> `cd api`


Copy the .env.example to .env

> `cp .env.example .env`


You will now need to add values to the .env file. 
Set MONGO_URL to the same value as MONGO_CONTAINER, this is done so the API can talk
to the Mongo container.

Build the docker container

> `docker-compose build`

Run the container

> `docker-compose up`


**Local Setup**
*Update later to only run mongo container*

Change directory to API

> `cd api`


Copy the .env.example to .env

> `cp .env.example .env`


You will now need to add values to the .env file. 
Set MONGO_URL to localhost:4001

Build the docker container

> `docker-compose build`

Run the containers

> `docker-compose up`

Install packages

> `yarn` or `npm install`

Run start script

> `yarn start` or `npm run start`

Go to the URL 
> `localhost:8080`
