# Use the official Playwright image which comes with browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.55.0-jammy

# Set the working directory inside the container
WORKDIR /app

# Copy the new package.json for test dependencies
COPY test-scripts/package.json .

# Install test dependencies
RUN npm install

# Copy the pre-built application
COPY build ./build

# Copy the test files
COPY tests ./tests
COPY test-scripts/playwright.config.ts .
COPY test-scripts/video-metadata-reporter.ts .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the tests
CMD ["npm", "run", "test"]
