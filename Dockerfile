FROM node:24-alpine AS base_image

FROM base_image AS build
WORKDIR /app
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
COPY pnpm-lock.yaml ./
RUN pnpm fetch
COPY . .
RUN pnpm install --offline && pnpm build

FROM base_image
WORKDIR /app
ARG PORT
USER node
COPY --from=build /app/dist/lecualab/landing-page .
EXPOSE $PORT
CMD ["node", "./server/server.mjs"]
