FROM node:16-alpine

RUN npm -g install serve
RUN mkdir /app
WORKDIR /app

COPY .env package.json . yarn.lock ./

RUN export $(cat .env | xargs)
RUN yarn install

COPY . /app/

RUN yarn build

EXPOSE 5000

CMD ["yarn", "serve"]