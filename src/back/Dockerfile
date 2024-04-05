FROM node:lts-alpine as prod-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8531
CMD ["node", "index.js"]