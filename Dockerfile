FROM quay.io/ukhomeofficedigital/asl-base:v12

RUN apk upgrade --no-cache

USER 999

WORKDIR /app

COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci --production --no-optional
COPY . /app

CMD npm test -- --env dev
