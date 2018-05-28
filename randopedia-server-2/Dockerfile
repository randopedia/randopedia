FROM node:alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install > install.log 2>&1

# Bundle app source
COPY . /usr/src/app
RUN npm run build

EXPOSE 8080
CMD [ "npm", "run",  "serve" ]
