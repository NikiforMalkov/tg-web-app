FROM node:18.17.1 as build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

CMD ["npm", "start"]
