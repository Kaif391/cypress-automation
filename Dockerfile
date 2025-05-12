# Use the official Cypress base image
FROM cypress/included:13.15.0

# Set working directory
WORKDIR /e2e

# Install git (in case it's not included in base image)
RUN apt-get update && apt-get install -y git

# Clone your repository (replace with actual repo)
# RUN git clone https://github.com/Kaif391/cypress-automation.git.
COPY . .

# Install dependencies
RUN npm install

# Run Cypress tests
# CMD ["npx", "cypress", "run", "--browser", "chrome"]
CMD ["sh", "-c", "npm run test:with-email"]
