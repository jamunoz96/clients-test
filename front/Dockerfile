FROM node:14 as build
# Create app directory
WORKDIR /usr/src/app

# Copy app source code
COPY . /usr/src/app/

# Install app dependencies
RUN yarn install --silent
RUN yarn build --silent


# Mount proxy
FROM nginx:1.19

COPY ./nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/build /usr/share/nginx/html