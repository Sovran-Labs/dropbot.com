# Use Node.js as the base image
FROM node:18.17.0-alpine

ENV NEXT_PUBLIC_BOT_API_URL=https://35.222.77.137
ENV NEXT_PUBLIC_TEMPORAL_URL=http://35.222.77.137

# Set the working directory in the container
WORKDIR /app

# Copy package.json and yarn.lock to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the app's source code to the container
COPY . .

# Build the Next app
RUN npm run build

# Serve the production build
CMD ["npm", "run", "start"]
