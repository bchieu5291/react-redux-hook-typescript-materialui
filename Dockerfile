FROM node:slim
WORKDIR /usr/src/app
ENV WELCOME_MESSAGE="welcome george docker v2"
COPY package.json .
COPY yarn.lock .

RUN yarn install
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"] 