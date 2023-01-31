# build code
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# run code
FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install --production
COPY --from=builder /usr/app/dist ./dist
COPY .env .
CMD ["npm", "start"]