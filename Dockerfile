# Use Node.js as the base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package files for the client and server
COPY client/package*.json ./client/
COPY server/package*.json ./server/

# Install dependencies for both client and server
RUN cd client && npm ci
RUN cd server && npm ci

# Copy the rest of the source code
COPY . .

# Build the client app
RUN cd client && npm run build

# Expose the backend server port
EXPOSE 5000

# Set the environment variable for production
ENV NODE_ENV=production

# Start the backend server
CMD ["npm", "start", "--prefix", "server"]
