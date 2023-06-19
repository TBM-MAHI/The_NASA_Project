# specify the node base image with your desired version node:<version>
FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

COPY client/package*.json client/
RUN npm install --prefix client --omit=dev

COPY /client /client
RUN npm run build --prefix client

COPY server/package*.json server/
RUN npm install --prefix server --omit=dev

COPY /server /server

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000
