# syntax = docker/dockerfile:1

ARG IMAGE=node:20-alpine

# Common
FROM ${IMAGE} as base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app
COPY --link package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY --link . .

# Development
FROM base as dev
CMD [""]

# Build
FROM base as build
RUN pnpm run build

# Production
FROM base as prod
COPY --chown=node:node --from=build /app/dist /app/dist
COPY --chown=node:node --from=build /app/db /app/db
COPY --chown=node:node --from=build /app/node_modules /app/node_modules
COPY --chown=node:node --from=build /app/package.json /app/pnpm-lock.yaml /app/.sequelizerc /app/
# COPY --chown=node:node --from=build /app/.env /app/dist/.env

ENV NODE_ENV="production"
ENV DEBUG="app:*"
ENV DATABASE_URL="postgres://postgres:postgres@postgres:5432/express_app_template"
ENV JWT_ACCESS_SECRET="N0t5oSecret"
ENV JWT_REFRESH_SECRET="N0t5oFre5h"

EXPOSE 4000
EXPOSE 9229
USER node
CMD [ "pnpm", "start" ]
