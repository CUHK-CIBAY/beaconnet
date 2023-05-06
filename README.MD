# Beaconnect

This a yet another twitter clone written in Typescript/React/GraphQL/Neo4j. Peek the production environent at [here](http://www.beaconnet.online)

## Environment

- `node` v16.20.0
- `yarn` v1.22.19
- `python` v3.7
- `awscli` v2+
- `sam` v1.36
- `Linux` v6.0.0+

## Before you start

Run `make`, it should go into all folder recursively to install required package.  
If there is error when trying to start the server (like missing library), try `yarn` in corresponding folder

## Start coding

We have bunch of deployment script for CD, for basic functionality, try to start 
- Backend
Go to `./graphql-gateway/js-graphql`, then `cp` the `.env.dev` to `.env`, you may also prepare your own Neo4j server and filled into the environment file. then `yarn dev`
- Frontend
Go to `./beaconnect-react-app` then change `./src/config/apollo.ts` line 7 to local backend server url (something like `http://127.0.0.1/3000`) then `yarn start`  

Such local testing environment having limiting functionalty as some backend service run only on the AWS cloud platform (like the `image-server`) so to explore whole product, it is better to create a AWS account to deploy all the stuff, There is also CD script in each repo for deployment. If there is still problem, open a issue and tag main maintainer `commitSudoku`
