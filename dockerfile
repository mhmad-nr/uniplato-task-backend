# Use an official Node.js runtime as the base image
FROM node:16.13.0

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application dependencies
RUN yarn install --ignore-platform --ignore-engines

# Copy the rest of the application code
COPY . .

# Copy the Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN yarn prisma generate

# Clean the previous build
RUN yarn run clean


# Build the project
RUN yarn run build

# Start the project
RUN yarn run start

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]
