FROM node:20-alpine AS builder
WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY . .
RUN yarn install
RUN yarn build
# RUN ls -lR

FROM nginx
COPY --from=builder /app/build /usr/share/nginx/html