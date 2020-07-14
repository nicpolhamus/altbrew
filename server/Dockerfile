FROM node:latest
# get into app directory
WORKDIR /usr/altbrew/app

COPY . .
RUN npm install
# kick up app in dev mode
CMD ["npm", "run", "start"]