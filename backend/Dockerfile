FROM node:18-alpine AS build
WORKDIR /usr/src/code
COPY package*.json ./
RUN npm install
COPY . .

# ---- Production Stage ----
FROM node:18-alpine AS production
# Copy app dependencies from the build stage
COPY --from=build /usr/src/code/node_modules /usr/src/app/node_modules
# Copy the rest of your application from the build stage
COPY --from=build /usr/src/code /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
CMD ["node", "dbServer.js"]