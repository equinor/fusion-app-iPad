# iPad Service
**Fusion app for iPad orders, returns and service.**

## Frontend
The frontend is built using Typescript and React, and was created using the
[fusion-cli](https://github.com/equinor/fusion-cli). Components from the
Equinor Design System ([EDS](https://eds.equinor.com/)) and
[Fusion components](https://github.com/equinor/fusion-components) are used. 

To run the frontend locally, you need to explicitly provide an ``API_URL``
variable. This can be done by either setting an environment variable or creating
an ``.env`` file in ``frontend``. An example file ``.env.example`` is provided.
You can then run
```
cd frontend
npm install
npm start
```
and navigate to localhost:3000.

## Backend
The backend is built using .NET 5.0.

To start the backend locally, run
```
cd backend/src
dotnet run
```
The default URL is set to localhost:5000.

To access the /Country endpoint you need to have the client secret of our app from azure available. 
One way to do this for now is to add a ``appsettings.Development.json`` file, which you can make from the ``appsettings.Development.json.example`` file in which you can store the ClientSecret in the following format. 
It is important that the file is named as suggested, to guarantee that it will be ignored by git, since it will now contain a secret.
```
    "AzureAd": {
        ...
        "ClientSecret": "XXXXXXXXXXX",
        ...
    },
```

## Docker
To run the project using Docker, run ``docker-compose up --build``. This will
build and run a docker container for both the frontend and backend.

## Testing
Cypress is used as a E2E test framework. To run Cypress tests locally, run
``docker-compose -f docker-compose.cypress.yml up --build``.

Additionally, Jest is used to test the frontend code. To run all Jest tests, run
```
cd frontend
npm run test
```

## Deployment
For now, the application is only deployed to the Radix _playground_ cluster.
Link to the application can be found
[here](https://frontend-fusion-app-ipad-dev.playground.radix.equinor.com/).
