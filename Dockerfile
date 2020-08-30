# base image
FROM node:latest

# install chrome for protractor tests
RUN apt-get update

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm install
RUN npm install -g @angular/cli@8
# RUN npm install -g @angular/cli@8 --unsafe

# add app
COPY . /app

# start app
CMD ["/bin/bash"]
# CMD ng serve --host 0.0.0.0

# Build image
# docker build -t angular-8:0.1 .

# Run image
# docker run --name Contacts-App-Container -v ${PWD}:/app -v Contact-App-Volume:/app/node_modules -p 4201:4200 --rm -it angular-8:0.2