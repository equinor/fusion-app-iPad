FROM cypress/base:10

WORKDIR /app/frontend

COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/tsconfig.json ./
RUN npm ci

WORKDIR /app
COPY . .

ENV XDG_CONFIG_HOME /app
WORKDIR /app/frontend

ENTRYPOINT npm run cyrun -- \
--env FRONTEND_URL=http://localhost:3000,API_URL=http://localhost:5000,AUTH_URL=http://localhost:8080 \
--config-file ./cypress.json \
# To run locally the following line should be commented out
--record --key ${CYPRESS_RECORD_KEY}
