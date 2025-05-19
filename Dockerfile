# Use Node.js base image
FROM node:20
# FROM cypress/browsers:node-20.10.0-chrome-122.0.6261.111-1-ff-122.0-edge-122.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Install Puppeteer dependencies
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libgdk-pixbuf2.0-0 \
    libnspr4 \
    libnss3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxtst6 \
    libglib2.0-0 \
    xdg-utils \
    xvfb \
    **libgbm1** \
    --no-install-recommends && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*



# Copy all files
COPY . .

# Install Netlify CLI globally
RUN npm install -g netlify-cli

# Set environment for production mode (non-sensitive)
ENV NODE_ENV=production
ENV NETLIFY_PERSONAL_ACCESS_TOKEN=nfp_fbVNmzpfvN3DmauSSEWZVFePpW5Y86Nj67b3
ENV GMAIL_APP_PASSWORD="ntzg xkrz dthw rjeh"
ENV NETLIFY_SITE_ID=215bf957-4cc4-4f7c-b747-76f1c8999189
# Default command — keep container alive so you can exec into it
CMD ["tail", "-f", "/dev/null"]
