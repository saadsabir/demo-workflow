FROM node:alpine3.10

RUN mkdir -p /app
WORKDIR /app

COPY package.json /
COPY yarn.lock /

RUN yarn install

COPY . /

EXPOSE 3000

# Environment variables
ENV NODE_ENV production
ENV PORT 3000
ENV PUBLIC_PATH "/"

CMD ["yarn", "start"]