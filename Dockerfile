# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /usr/src/app

# Create a stage for installing production dependencies.
FROM base as deps

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install only production dependencies
RUN yarn install --production --frozen-lockfile

# Create a stage for building the application.
FROM base as build

# Copy necessary configuration files
COPY nest-cli.json tsconfig.build.json tsconfig.json ./

# Copy package.json, yarn.lock, and production node_modules
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package.json yarn.lock ./

# Install all dependencies including devDependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the source files into the image
COPY . .

# Run the build script
RUN yarn run build

# Create a new stage to run the application with minimal runtime dependencies
FROM base as final

# Set NODE_ENV to production
ENV NODE_ENV production

# Run the application as a non-root user for security
USER node

# Copy package.json and production dependencies
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY package.json ./

# Copy the built application from the build stage
COPY --from=build /usr/src/app/dist ./dist

# Expose the port that the application listens on
EXPOSE 8000

# Run the application
CMD ["node", "dist/main"]
