# Use the official Cypress base image
FROM cypress/included:13.6.6

# Set working directory
WORKDIR /e2e

# Install git (in case it's not included in base image)
RUN apt-get update && apt-get install -y git

# Clone your repository (replace with actual repo)
RUN git clone https://github.com/Kaif391/cypress-automation.git.

# Install dependencies
RUN npm install

# Run Cypress tests
CMD ["npx", "cypress", "run"]
