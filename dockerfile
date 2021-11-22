# Dockerfile
# PROD CONFIG
FROM node:14

# Create app dir
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json ./
COPY yarn.lock ./

COPY ormconfig.docker.json ./ormconfig.json
COPY .env .

# RUN npm install
# RUN npm build
RUN yarn 

COPY . .

RUN yarn build

ENV NODE_ENV production

EXPOSE 8080

CMD [ "node", "dist/index.js" ]

USER node