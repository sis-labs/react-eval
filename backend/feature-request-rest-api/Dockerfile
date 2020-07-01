FROM node:alpine

RUN apk add --update npm
RUN npm i -g pm2
WORKDIR /opt/app
RUN chown -R node:node /opt/app
USER node:node
ENV NODE_ENV production
COPY . .
RUN npm install
EXPOSE 3000
CMD ["pm2-runtime", "app.js"]
