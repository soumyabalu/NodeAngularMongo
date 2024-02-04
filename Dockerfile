# Step 1: Use the official Node.js image as the base image
FROM node:21 as build-stage

# Step 2: Set the working directory in the container
CMD ["mkdir", "app"]
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if available)
COPY angproject1/package*.json /app/

# Step 4: Install project dependencies

RUN npm install

# Step 5: Copy the project files into the container
COPY . /app

# Step 6: Build the project for production
#RUN npm run  build

# Step 7: Use nginx to serve the project
FROM nginx:stable-alpine as production-stage

# Step 8: Copy the build output to replace the default nginx contents
#COPY --from=build-stage /app/dist/* /usr/share/nginx/html

# Step 9: Expose port 80 to the outside once the container has launched
EXPOSE 80

# Step 10: Run nginx
CMD ["nginx", "-g", "daemon off;"]
