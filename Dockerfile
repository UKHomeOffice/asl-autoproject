FROM node:12

RUN apt-get update
RUN apt-get upgrade -y

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --production --no-optional
COPY . /app

CMD npm test -- --env dev
