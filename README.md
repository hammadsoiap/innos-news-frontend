# Innos-news Frontend React 
This project is a React-based News website assessment, utilizing Material UI.

## Requirement
- Minimum Npm version : 6.14.13
- Minimum Node version : 16.20.2

## Installation
 
Start by cloning the repository:

```
git clone https://github.com/hammadsoiap/innos-news-frontend.git

```

Navigate into the project directory:
```
cd innos-news-frontend
```
## With Docker
#### With docker-compose: ####

`docker-compose up --build --force-recreate`

#### Or plain Docker:

```
docker build -t newsfrontend-react .
```
### Without docker  
Install node modules with below command:
```
npm install
```


### Usage
Open .env file and update the `REACT_APP_API_BASE_URL`
<br> With your backend API url.

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Code Explanation
`stores` : I am using Redux Saga to call the APIs and get the data.
Redux saga is managed in the `stores` folder, where you can see all the constants, actions, reducer, and Saga actions.

`utils`: In the `utils` folder one js file for managing all API  and handling the response. That is called by Saga.

`styles`: common style files.

`routes`: All routes is managed in `routes` folder.

`components`: All reusable and required components is managed in `components` folder.

`containers`: In this folder all the website pages.


