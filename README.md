# Image-Processing-App Project
## Overview
This is an API that can be used in two different ways. The first, as a simple placeholder API that allows us to place images into our frontend with the size set via url parameters. The second use case is as a library to serve properly scaled versions of our images to the frontend to reduce page load size.

## Instructions
use npm install to install all the project dependencies 

## Scripts
### lint
use npm run lint to run eslint. I integrated Prettier and eslint together so running this script will not only show eslint error but prettier errors as well
### lint:f
use npm run lint:f to run eslint and fix problems. 
### prettier
use npm run prettier to fix prettier errors
### dev
use npm run dev to run the typescript index file in the src folder with nodemon
### build
npm run build will create the build folder that contains the transpiled JS codes
### start
npm run start will build the code and run the built project
### test
npm run test will build the project then run jasmine on the build JS files