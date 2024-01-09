# ---- Build Stage ----
FROM node:18-alpine AS build
WORKDIR /usr/src/code
# Copy package.json and package-lock.json
COPY package*.json ./
# Install app dependencies
RUN npm install
# Copy the rest of your application code
COPY . .
ARG REACT_APP_DATABASEURL
ENV REACT_APP_DATABASEURL=${REACT_APP_DATABASEURL}
RUN npm run build

# ---- Production Stage ----
FROM node:18-alpine AS production
# Install serve globally
RUN npm install serve -g
# Copy built application from previous stage
COPY --from=build /usr/src/code/build /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
CMD [ "serve" ]