FROM node:18.16.0 AS frontend
WORKDIR /usr/src/app/ui
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build
RUN npm run generate
EXPOSE 3001
ENV NUXT_HOST='0.0.0.0'
ENV DEVTOOLS_ENABLED=false

CMD [ "npm", "run", "preview" ]
