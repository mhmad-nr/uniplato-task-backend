#!/bin/bash

# Clean the previous build
yarn run clean

# Install dependencies
yarn install

# Build the project
yarn run build

# Start the project
yarn run start

echo "Build completed successfully."
