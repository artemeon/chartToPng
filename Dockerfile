FROM node:14
WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./webpack.config.js /app/webpack.config.js
VOLUME /app/dist
RUN npm i
CMD npm run build
