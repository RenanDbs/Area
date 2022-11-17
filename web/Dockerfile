FROM node:latest

WORKDIR /app

COPY . /app
RUN npm install --legacy-peer-deps

EXPOSE 8081
# start app
CMD ["npm", "start"]
