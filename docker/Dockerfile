# Etap budowania
FROM node:18-alpine as build

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . ./
RUN npm run build

# Etap produkcyjny
FROM nginx:alpine

# Kopiowanie skonfigurowanego pliku nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Kopiowanie zbudowanej aplikacji
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
