FROM node:latest

WORKDIR /app

RUN chown -R node:node /app

COPY --chown=node:node package*.json ./

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 8080

CMD [ "npm", "run", "dev:11ty" ]
