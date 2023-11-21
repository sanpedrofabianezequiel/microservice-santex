FROM node:alpine As development

WORKDIR /app

COPY ./profile-node/package*.json ./

RUN npm install

COPY ./profile-node ./

EXPOSE 3002

CMD ["npm", "run", "start:dev", "profile-node"]
