# Use official Node.js image
FROM node:18

# Create app directory inside the container
WORKDIR /app

# Copy package files first (better for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your app source code
COPY . .

# Expose the port Hugging Face expects (7860 is mandatory)
EXPOSE 7860

# Start the server
CMD [ "node", "index.js" ]