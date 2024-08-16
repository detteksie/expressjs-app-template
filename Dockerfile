# syntax = docker/dockerfile:1

ARG NODE_VERSION=20
ARG IMAGE=node:${NODE_VERSION}-alpine

FROM ${IMAGE} AS base
LABEL fly_launch_runtime="Node.js"

WORKDIR /home/node/app
ENV PORT=4000
ENV DEBUG="app:*"
ENV DATABASE_URL="postgres://postgres:postgres@postgres:5432/express_app_template"
ENV JWT_ACCESS_SECRET="N0t5oSecret"
ENV JWT_REFRESH_SECRET="N0t5oFre5h"
EXPOSE 4000
EXPOSE 9229

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN npm install -g pm2 && pm2 update
COPY --link .profile /root/
COPY --link package.json pnpm-lock.yaml ./

FROM base AS build
RUN pnpm install --frozen-lockfile --prod=false
COPY --link . .
RUN pnpm build
RUN pnpm prune --prod

FROM base
COPY --chown=node:node .profile ../
COPY --chown=node:node --from=build /home/node/app/node_modules node_modules
COPY --chown=node:node --from=build /home/node/app/package.json /home/node/app/pnpm-lock.yaml ./
COPY --chown=node:node --from=build /home/node/app/dist dist
COPY --chown=node:node --from=build /home/node/app/db db
COPY --chown=node:node --from=build /home/node/app/public public
COPY --chown=node:node --from=build /home/node/app/views views
COPY --chown=node:node --from=build /home/node/app/tsconfig.json /home/node/app/ecosystem.config.js /home/node/app/node /home/node/app/.sequelizerc ./

ENV NODE_ENV="production"
RUN mkdir /home/node/.pm2 && chown -R node:node "/home/node/.pm2"
USER node
RUN pm2 update
CMD [ "npm", "run", "start:pm2" ]
