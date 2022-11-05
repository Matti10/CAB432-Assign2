############################################################
# CAB432 Assignment 1 - n10467874
# Dockerfile - Client
############################################################
# Set the base image to Node 16
FROM node:16

ENV PORT 80

# File Author / Maintainer
LABEL author="Mattias Winsen"

# Update container
RUN apt-get update && apt-get install -y 


# Copy the application folder inside the container
ADD . /client
# Expose ports
EXPOSE 80

# Set the default directory where CMD will execute
WORKDIR /client

RUN npm install

# Set the default command to execute when creating a new container
CMD node client.js
