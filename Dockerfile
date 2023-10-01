FROM node:18-alpine AS base

FROM base AS deps

WORKDIR /app

COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile


FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g pnpm

RUN pnpm build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

ARG AUTH0_SECRET
ARG AUTH0_BASE_URL
ARG AUTH0_ISSUER_BASE_URL
ARG AUTH0_CLIENT_ID
ARG AUTH0_CLIENT_SECRET

ENV AUTH0_SECRET=$AUTH0_SECRET
ENV AUTH0_BASE_URL=$AUTH0_BASE_URL
ENV AUTH0_ISSUER_BASE_URL=$AUTH0_ISSUER_BASE_URL
ENV AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID
ENV AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
