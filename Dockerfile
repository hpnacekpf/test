# builder
FROM node:12-alpine as production

WORKDIR /app

ARG ENV_FILE

ENV ENV_FILE=${ENV_FILE}

RUN echo $ENV_FILE

COPY package.json .

RUN apk add --no-cache --virtual .gyp python2 make g++ git
RUN npm install

COPY . .

RUN if [ "$ENV_FILE" = ".env.staging" ]; then cp -rf $ENV_FILE .env.production ; fi

RUN npm run build

RUN rm -rf src/
