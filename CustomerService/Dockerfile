FROM node:latest
WORKDIR /Customers
COPY package*.json .
RUN npm install
COPY . .
EXPOSE 8080
CMD ["sh", "-c", "node createcustomers.js && npm start"]