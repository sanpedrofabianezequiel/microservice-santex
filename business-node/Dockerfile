FROM node:alpine As development

WORKDIR /app

COPY ./business-node/package*.json ./

RUN npm install

COPY ./business-node ./

EXPOSE 3002

CMD ["npm", "run", "start:dev", "business-node"]
