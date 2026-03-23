# --- BUILD STAGE ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- PRODUCTION STAGE ---
FROM nginx:stable-alpine
# Vite outputs to 'dist'. We copy that to Nginx's html folder.
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80

# Basic Nginx config to handle React Router (Single Page App)
RUN echo 'server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files $uri $uri/ /index.html; \
    } \
}' > /etc/nginx/conf.d/default.conf

HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]