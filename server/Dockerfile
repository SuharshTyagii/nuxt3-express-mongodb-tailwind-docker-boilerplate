FROM node:18.16.0 AS backend
WORKDIR /usr/src/app
RUN npm install pm2 -g

COPY package*.json ./
RUN npm install
COPY . .
CMD ["pm2-runtime", "server.js"]
