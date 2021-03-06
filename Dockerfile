FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm i

# Bundle app source
COPY . .

EXPOSE 8080
RUN npm run tscheck
RUN npm run build-storybook
RUN npm run build
CMD npm start
