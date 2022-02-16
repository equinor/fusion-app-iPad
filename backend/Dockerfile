# The container will be based on this image
FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine AS base
WORKDIR /app
EXPOSE 5000
# The alpine base image sets DOTNET_SYSTEM_GLOBALIZATION_INVARIANT to 'true' by default,
# but this is not supported by SQL and EF,
# and will cause an error to occur when connecting to database.
# We need the icu-libs package because its not included in alpine and is needed to run with it set to 'false'
# See this issue: https://github.com/dotnet/dotnet-docker/issues/2346 and this blog: https://www.abhith.net/blog/docker-sql-error-on-aspnet-core-alpine/
RUN apk add icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
# Add a new group for non-roots users, add user and switch to user
RUN addgroup -S -g 1001 radix-non-root-group
RUN adduser -S -u 1001 -G radix-non-root-group radix-non-root-user
USER 1001

FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine AS build
WORKDIR /src
# Copy project to be restored
COPY ["api/api.csproj", "api/"]
# Also copy nuget.config because we have custom sources
COPY ["api/nuget.config", "api/"]
RUN dotnet restore "api/api.csproj"
COPY . .
WORKDIR "/src/api"
RUN dotnet build "api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "api.csproj" -c Release -o /app/publish

# Use base image, and copy published app into it
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "api.dll", "--urls=http://0.0.0.0:5000"]
