# Pin specific version for stability
# Use slim for reduced image size
FROM node:19.6-bullseye-slim AS base

# Specify working directory other than /
WORKDIR /usr/src/app

# Copy only files required to install
# dependencies (better layer caching)
COPY package*.json ./

# Use cache mount to speed up install of existing dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

# Copy and build the application
COPY . .
RUN npm run build

# Production stage
FROM node:19.6-bullseye-slim AS production

# Set NODE_ENV
ENV NODE_ENV production

# Use non-root user
# Use --chown on COPY commands to set file permissions
USER node

# Specify working directory other than /
WORKDIR /usr/src/app

# Copy only files required to run the application
COPY --from=base /usr/src/app/package*.json ./
COPY --from=base /usr/src/app/dist/ ./

# Install only production dependencies
# Use cache mount to speed up install of existing dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm ci --production=false

# Expose the server port
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
