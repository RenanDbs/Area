FROM node:18

WORKDIR /app

COPY . /app

RUN yarn

RUN yarn build

EXPOSE 8080

CMD yarn start
