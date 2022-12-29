FROM node:14
# Create app directory
WORKDIR /usr/src/app

# Copy app source code
COPY . /usr/src/app/

# Install app dependencies
RUN yarn install --silent
RUN yarn add react-scripts@5.0.1 -g --silent

#Expose port and start application
EXPOSE 3000

CMD ["yarn", "start"]