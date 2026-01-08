# -----------------------------
# Build Stage
# -----------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Install ALL dependencies development and production
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# transpile TS to JS
RUN npm run build


# -----------------------------
# 2. Production Stage
# -----------------------------
FROM node:20-alpine

WORKDIR /app

# Install only production dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy compiled JS from builder
COPY --from=builder /app/dist ./dist

# Run migrations, then start server
CMD ["sh", "-c", "npm run migrate:up && npm start"]

# Expose application port
EXPOSE 3000