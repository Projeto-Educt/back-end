FROM node:21-alpine

RUN wget -O /usr/local/bin/dockerize https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz \
  && tar -C /usr/local/bin -xzvf /usr/local/bin/dockerize \
  && chmod +x /usr/local/bin/dockerize

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .


EXPOSE 3000

ENTRYPOINT ["dockerize", "-wait", "tcp://postgres_educt:5432"]

CMD ["npm", "run", "start:dev"]