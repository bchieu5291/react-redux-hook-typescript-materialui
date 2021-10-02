FROM node:lts-slim
WORKDIR /usr/src/app
ENV WELCOME_MESSAGE="welcome george docker v2"
COPY package.json .
COPY yarn.lock .

# RUN apt-get update || : && apt-get install -y \
#     python \
#     build-essential

RUN yarn install
COPY . .

RUN yarn build

RUN npm install -g serve

EXPOSE 3000
CMD ["yarn", "prod"] 