FROM node:latest
# get into app directory
WORKDIR /usr/altbrew/app
# need to copy only package.json at first, or we'll get npm install issues
COPY package.json .
RUN npm install
# copy over everything else
COPY . .
# kick up app in dev mode
CMD ["npm", "run", "start:dev"]