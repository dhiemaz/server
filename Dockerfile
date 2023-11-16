FROM node:16
RUN mkdir -p /home/node/server/node_modules && chown -R node:node /home/node/server
WORKDIR /home/node/server

COPY package*.json ./

USER node

RUN npm install
COPY --chown=node:node . .
EXPOSE 3000
CMD ["node", "app.js"]