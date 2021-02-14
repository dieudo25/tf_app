FROM node:12-stretch-slim

WORKDIR /app/frontend

COPY ./frontend/package.json /app/frontend
COPY ./frontend/yarn.lock /app/frontend

ENV PATH ./node_modules/.bin/:$PATH

RUN yarn install