FROM node:20


WORKDIR /backend
COPY package.json .


RUN npm install

COPY . .

RUN npx prisma init
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "index.js"]
