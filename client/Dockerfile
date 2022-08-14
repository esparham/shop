FROM node:latest as build-stage
WORKDIR /client
COPY package*.json ./
RUN npm i @vue/cli
RUN npm install
COPY . .
ARG VUE_APP_API_BASE_URL
ENV VUE_APP_API_BASE_URL=$VUE_APP_API_BASE_URL
RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /client/dist /usr/share/nginx/html
EXPOSE $VUE_DOCKER_PORT
CMD nginx -g 'daemon off;'