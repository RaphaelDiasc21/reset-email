FROM node:latest

WORKDIR /app

COPY ./package.json /app/package.json

RUN npm install

COPY . /app

RUN ls

EXPOSE 3400

CMD ["npm","start"]