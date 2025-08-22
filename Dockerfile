# Use the official Playwright image which comes with browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the tests and generate golden files
CMD ["npm", "run", "test:update-goldens"]
