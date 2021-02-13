FROM node:12.20.0

EXPOSE 3000

COPY . ./frontend

WORKDIR /frontend

RUN npm install
RUN npm ddp
RUN npm run build
CMD ["npm", "start"]