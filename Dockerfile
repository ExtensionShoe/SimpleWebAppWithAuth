FROM node:14

WORKDIR /home


COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080
CMD [ "npm", "run", "dockerStart" ]