# syntax = docker/dockerfile:1

ARG IMAGE=node:20-alpine

FROM ${IMAGE} AS env
WORKDIR /home/node/app
ENV PORT=4000
ENV DEBUG="app:*"
ENV DATABASE_URL="postgres://postgres:postgres@postgres:5432/express_app_template"
ENV JWT_ACCESS_SECRET="N0t5oSecret"
ENV JWT_REFRESH_SECRET="N0t5oFre5h"
EXPOSE 4000
EXPOSE 9229

# Common
FROM env AS base
RUN npm install -g pm2 && pm2 update

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY --link .profile /root/
COPY --link package.json pnpm-lock.yaml ./

# Install All
FROM base AS installall
RUN mkdir -p /tmp/dev
COPY --from=base --link /home/node/app/package.json /home/node/app/pnpm-lock.yaml /tmp/dev/
RUN cd /tmp/dev && pnpm install --frozen-lockfile

# Development
FROM base AS development
COPY --from=installall /tmp/dev/node_modules node_modules
COPY --link . .

# Build
FROM development AS build
RUN pnpm run build

# Install
FROM base AS install
RUN mkdir -p /tmp/prod
COPY --from=base --link /home/node/app/package.json /home/node/app/pnpm-lock.yaml /tmp/prod/
RUN cd /tmp/prod && pnpm install --frozen-lockfile --prod

# Production
FROM base AS production
COPY --chown=node:node .profile ../
COPY --chown=node:node --from=install /tmp/prod/node_modules node_modules
COPY --chown=node:node --from=install /tmp/prod/package.json /tmp/prod/pnpm-lock.yaml ./
COPY --chown=node:node --from=build /home/node/app/dist dist
COPY --chown=node:node --from=build /home/node/app/db db
COPY --chown=node:node --from=build /home/node/app/public public
COPY --chown=node:node --from=build /home/node/app/views views
COPY --chown=node:node --from=build /home/node/app/tsconfig.json /home/node/app/ecosystem.config.js /home/node/app/node /home/node/app/.sequelizerc ./

ENV NODE_ENV="production"
RUN mkdir /home/node/.pm2 && chown -R 1000:1000 "/home/node/.pm2"
USER node
RUN pm2 update
CMD [ "npm", "run", "start:pm2" ]
