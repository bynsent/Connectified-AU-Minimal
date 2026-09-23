FROM node:20.19-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG VITE_MONDAY_API_TOKEN
ENV VITE_MONDAY_API_TOKEN=${VITE_MONDAY_API_TOKEN}

RUN npm run build

FROM nginx:stable-alpine AS production-stage

COPY nginx.conf /etc/nginx/templates/default.conf.template

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"]
