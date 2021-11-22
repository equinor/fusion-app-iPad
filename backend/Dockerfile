FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS build

WORKDIR /source

# Copy the source files over
COPY . .

# Set the working directory where the actual source files reside and run build/publish
WORKDIR /source/api
RUN dotnet publish -c release -o /app

FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine
WORKDIR /app
COPY --from=build /app ./

EXPOSE 5000

# Add a new group "radix-non-root-group" with group id 1001 
RUN addgroup -S -g 1001 radix-non-root-group

# Add a new user "radix-non-root-user" with user id 1001 and include in group
RUN adduser -S -u 1001 -G radix-non-root-group radix-non-root-user

USER 1001

ENTRYPOINT ["dotnet", "api.dll", "--urls=http://0.0.0.0:5000"]
