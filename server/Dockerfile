FROM node:18 as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["node","./dist/main.js"]


# FROM node:18 as deploy

# COPY --from=build /usr/src/app/dist/ . 


