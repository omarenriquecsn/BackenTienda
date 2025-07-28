
FROM node:20

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ && rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./

RUN npm cache clean --force

COPY . .

EXPOSE 8080

CMD ["npm", "start"]