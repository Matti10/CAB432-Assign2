############################################################
# CAB432 Assignment 1 - n9995846
# Dockerfile - Client
############################################################
# Set the base image to Node 16
FROM node:16

# File Author / Maintainer
LABEL author="Simon Di Florio"

# Update container
RUN apt-get update && apt-get install -y 

# Copy the application folder inside the container
ADD . /client
# Expose ports
EXPOSE 5173

# Set the default directory where CMD will execute
WORKDIR /client

RUN npm install

# Set the default command to execute when creating a new container
CMD npm run dev
