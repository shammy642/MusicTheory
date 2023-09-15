FROM node:18
WORKDIR /usr/src/code
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY . .

RUN npm install
RUN npm run build

# Install server and serve
RUN npm install serve -g
RUN mv /usr/src/code/build /usr/src/app
EXPOSE 3000
WORKDIR /usr/src/app
CMD [ "serve" ]