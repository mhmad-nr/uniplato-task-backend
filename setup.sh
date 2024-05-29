#!/bin/bash

# Clean the previous build
pnpm run clean

# Install dependencies
pnpm install

# Generate database prisma code
pnpm run db:gen

# Build the project
pnpm run build

# Start the project
pnpm run start

echo "Build completed successfully."
