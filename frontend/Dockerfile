# Use an official Node runtime as a parent image
FROM node:18.17.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json separately to take advantage of Docker layer caching
COPY package.json ./

# Install project dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Build the project
RUN npm run build

# Expose the port on which your app runs
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
