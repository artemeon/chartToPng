FROM node:14
WORKDIR /app
COPY ./font /app/font
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./test.json /app/test.json
COPY ./tsconfig.json /app/tsconfig.json
COPY ./webpack.config.js /app/webpack.config.js
VOLUME /app/dist
RUN npm i
CMD npm run build && node dist/renderGraphImage.js < test.json
