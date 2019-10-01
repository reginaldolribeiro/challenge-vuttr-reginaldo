FROM node:10-alpine

WORKDIR /challenge-vuttr-reginaldo

COPY package.json .

RUN yarn --silent

RUN yarn global add nodemon --silent

COPY . .

EXPOSE 3000

CMD yarn dev