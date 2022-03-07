# iPad Service
```diff 
- This project has been discontinued and its deployments are suspended (for now). 
```
---
**Fusion app for iPad orders, returns and service.**

![Frontend](https://github.com/equinor/fusion-app-iPad/actions/workflows/frontend.yml/badge.svg)
![Backend](https://github.com/equinor/fusion-app-iPad/actions/workflows/backend.yml/badge.svg)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/0b37a44f66044dbc81fff906344b476e)](https://www.codacy.com/gh/equinor/fusion-app-iPad/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=equinor/fusion-app-iPad&amp;utm_campaign=Badge_Grade)
[![Cypress](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/5svyyo&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/5svyyo/runs)

## Deployments
We have 3 different environments deployed, CI, QA and Prod. The CI environment corresponds to the main branch,
while QA and Prod have their respective branches. Promotions to the different branches are done through pull-requests.
The application is deployed to Radix.

| Environment | Deployment                                                                                                                                                | Status                                                                                                       |
|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------|
| CI          | [Frontend](https://frontend-fusion-ipad-service-ci.radix.equinor.com/)<br>[Backend](https://backend-fusion-ipad-service-ci.radix.equinor.com/swagger)     | ![CI](https://api.radix.equinor.com/api/v1/applications/fusion-ipad-service/environments/ci/buildstatus)     |
| QA          | [Frontend](https://frontend-fusion-ipad-service-qa.radix.equinor.com/)<br>[Backend](https://backend-fusion-ipad-service-qa.radix.equinor.com/swagger)     | ![QA](https://api.radix.equinor.com/api/v1/applications/fusion-ipad-service/environments/qa/buildstatus)     |
| Prod        | [Frontend](https://frontend-fusion-ipad-service-prod.radix.equinor.com/)<br>[Backend](https://backend-fusion-ipad-service-prod.radix.equinor.com/swagger) | ![Prod](https://api.radix.equinor.com/api/v1/applications/fusion-ipad-service/environments/prod/buildstatus) |

## Frontend
The frontend is built using Typescript and React, and was created using the
[fusion-cli](https://github.com/equinor/fusion-cli). Components from the
Equinor Design System ([EDS](https://eds.equinor.com/)) and
[Fusion components](https://github.com/equinor/fusion-components) are used. 

To run the frontend locally, you need to explicitly provide an ``API_URL``
and ``AD_CLIENT_ID`` variable. This can be done by either setting an environment variable or creating
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
The backend is built using .NET 6.0.  

Swagger documentation for the backend can be found 
[here](https://backend-fusion-ipad-service-prod.radix.equinor.com/swagger).  

The common environment variables are stored in the ``appsettings.json`` file.
When running locally, the environment variables from ``appsettings.Development.json``
are used.  
When running as a radix deployment, the environment variables that are not common
to all environments (CI, QA and Prod) are stored in Radix as described
[here](https://www.radix.equinor.com/docs/topic-runtime-env/#environment-variables)
and
[here](https://www.radix.equinor.com/docs/topic-concepts/#secret).

To start the backend locally, you need to provide some environment variables.
One way to do this is to add a ``appsettings.Development.json`` file, which 
you can make from the ``appsettings.Development.json.example`` file.  
In the ``appsettings.Development.json``, fill in the missing values.
The **client secret** is the only secret needed to run locally because it is
needed for the connection to the Azure KeyVault.
This can be provided either through the
[ASP.NET Secret Manager](https://www.sharepointcafe.net/2021/04/secret-manager-in-dotnet-core.html)
or in the `appsettings.Development.json` file.
  
All other environment variables and secrets are stored in the Azure KeyVault.
  
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

Dotnet format is included in the .NET6 SDK.

To check the formating, run 
```
cd backend
dotnet format --severity info --verbosity diagnostic --verify-no-changes
```
and to fix the formatting run
```
cd backend
dotnet format --severity info --verbosity diagnostic
```
  
## Database
The backend is connected to a SQL database hosted in Azure in the Fusion "Database cluster".
We are using 
[Entity Framework Core](https://docs.microsoft.com/en-us/ef/core/)
to manage the database from our code.

### Migrations
Updates to the database structure are done in Github Actions.  
  
When a pull request contains changes in the `backend/api/Database/Migrations` folder,
[a workflow](https://github.com/equinor/fusion-app-iPad/blob/main/.github/workflows/notifyMigrationChanges.yml)
is triggered to notify that the pull request has database changes.
After the approval process, a user can then trigger the database changes by commenting
`/UpdateDatabase` on the pull request.
This will trigger 
[another workflow](https://github.com/equinor/fusion-app-iPad/blob/main/.github/workflows/updateDatabase.yml) 
which updates the database with the new changes.
  
By doing migrations this way, we ensure that the commands themselves are scripted, and that the database
changes become part of the review process of a pull request.
  
## Docker
To run the project using Docker, you need to provide the ClientSecret as an environment variable to the image.  
This can be done by adding a ".env-file" **outside the directory** and referencing it using the `--env-file` flag.  
From the repository root, you can then run ``docker-compose --env-file <path-to-env-file> up --build``. This will
build and run a docker container for both the frontend and backend.  
The `--env-file` flag must come before the `up` command.

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

## Monitoring
We use [Azure Application Insights](https://docs.microsoft.com/en-us/azure/azure-monitor/app/asp-net-core)
to monitor the backend of our application.
  
We have one application insight instance for each environment, each in their respective resource group in Azure.  
The connection strings for the AI instances are stored in the keyvault.
