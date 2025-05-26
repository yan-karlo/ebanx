# Use an official Node.js base image
FROM node:18-alpine

RUN apk add --no-cache curl


# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all source code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to run the application using tsx
CMD ["npx", "tsx", "src/app.ts"]
