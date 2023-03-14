FROM node:19.4-bullseye AS build

# Specify working directory other than /
WORKDIR /app

# Copy only files required to install
# dependencies (better layer caching)
COPY package*.json ./

# Use cache mount to speed up install of existing dependencies
RUN --mount=type=cache,target=/usr/src/app/.npm \
    npm set cache /usr/src/app/.npm && \
    npm install

ENV NODE_ENV=production

COPY . .
RUN npm run build

FROM node:19.4-bullseye
WORKDIR /app

COPY --from=build /app/package*.json ./
RUN npm ci --only=production
ENV NODE_ENV=production

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

CMD ["npm", "start"]

EXPOSE 8080
