FROM node:current-alpine
# get into app directory
WORKDIR /usr/altbrew/app

COPY . .
RUN npm install
# install deps for rebuilding bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python
# need to rebuild bcrypt specifically for docker image
RUN npm rebuild bcrypt --build-from-source
# kick up app in dev mode
CMD ["npm", "run", "start:dev"]