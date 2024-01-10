FROM node:alpine
WORKDIR /client
COPY package.json .
COPY package-lock.json .
RUN apk add --no-cache python3 make g++

# Set environment variable for Python
ENV PYTHON /usr/bin/python3
RUN npm install && npm install --save-dev node-sass sass-loader style-loader css-loader mini-css-extract-plugin

COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]