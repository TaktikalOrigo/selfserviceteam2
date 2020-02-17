FROM node:carbon

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN touch .npmrc
RUN printf //registry.npmjs.org/:_authToken=${NPM_TOKEN} > .npmrc
RUN npm i
RUN rm -f .npmrc

# Bundle app source
COPY . .

EXPOSE 8080
RUN npm run tscheck
RUN npm run build
CMD npm start
