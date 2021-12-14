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

### Formatting
We use Prettier to format our frontend code in js, ts, tsx and css.
To check the format of the files run
```
cd frontend
npm run prettier_check
```
and to fix the formatting of said files run
```
cd frontend
npm run prettier_write
```

## Backend
The backend is built using .NET 5.0.  

Swagger documentation for the backend can be found 
[here](https://backend-fusion-app-ipad-dev.playground.radix.equinor.com/swagger).  

To start the backend locally, you need to provide the **client secret** from 
azure app registration, and the **Ocp-Apim-Subscription-Key** from
[APIM](https://api.equinor.com/products/corporate).
One way to do this is to add a ``appsettings.Development.json`` file, which 
you can make from the ``appsettings.Development.json.example`` file.  
In the ``appsettings.Development.json``, fill in the missing values.

You can then run
```
cd backend/api
dotnet run
```
The default URL is set to localhost:5000.

### Formatting
We use [dotnet format](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-format)
to format and verify code style in backend based on the 
[C# coding conventions](https://docs.microsoft.com/en-us/dotnet/csharp/fundamentals/coding-style/coding-conventions).  

For first time installation of the tool run
```
cd backend
dotnet tool restore
```

To check the formating, run 
```
cd backend
dotnet format -w -s info -a info --check --verbosity diagnostic
```
and to fix the formatting run
```
cd backend
dotnet format -w -s info -a info
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

xUnit is used for unit testing the backend code. To run all xUnit tests, run
```
cd backend
dotnet test
```  

## Deployment
For now, the application is only deployed to the Radix _playground_ cluster.
Link to the application can be found
[here](https://frontend-fusion-app-ipad-dev.playground.radix.equinor.com/).  
