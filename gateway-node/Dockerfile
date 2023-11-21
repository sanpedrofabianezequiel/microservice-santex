FROM node:alpine As development

WORKDIR /app

COPY ./gateway-node/package*.json ./

RUN npm install

COPY ./gateway-node ./

EXPOSE 3002

CMD ["npm", "run", "start:dev", "gateway-node"]
