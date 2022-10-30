############################################################
# CAB432 Assignment 1 - n9995846
# Dockerfile - Server
############################################################
# Set the base image to Node 16
FROM node:16

ENV PORT 3001

ENV TM_API_KEY TM_API_VALUE
ENV TM_SECRET_KEY TM_SECRET_VALUE
ENV MM_API_KEY MM_API_VALUE

ENV DYNAMO_TABLE TABLE_VALUE
ENV DYNAMO_PARTITION PARTITION_VALUE
ENV DYNAMO_SORT SORT_VALUE
ENV DYNAMO_ATTRIBUTE ATTRIBUTE_VALUE
ENV DYNAMO_REGION REGION_VALUE

ENV AWS_ACCESS_KEY_ID AWS_ACCESS_KEY_VALUE
ENV AWS_SECRET_ACCESS_KEY AWS_SECRET_ACCESS_VALUE
ENV AWS_SESSION_TOKEN AWS_SESSION_TOKEN_VALUE


# File Author / Maintainer
LABEL author="Simon Di Florio"

# Update container
RUN apt-get update && apt-get install -y 


# Copy the application folder inside the container
ADD . /server
# Expose ports
EXPOSE 3001

# Set the default directory where CMD will execute
WORKDIR /server

RUN npm install

# Set the default command to execute when creating a new container
CMD npm start
