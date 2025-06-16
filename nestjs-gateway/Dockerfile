FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npm run builder

FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package@.json ./

RUN addgroup  -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

RUN chown -R nestjs:nodejs /appUSER nestjs
EXPOSE 3001

HEALTHCHECK --interval= --timeout=3s --start-period=5s --retries=3 \
CMD curl -f http://localhost:3001/api/health || exit 1

CMD ["node", "dist/main"]