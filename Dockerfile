FROM node:postgres AS builder
WORKDIR /app
COPY /*.json ./
COPY . .
RUN yarn run build

FROM node:postgres
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["yarn", "run", "start:prod"]
