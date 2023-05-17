FROM balenalib/generic-amd64-debian-node:18-bookworm-build-20221215 as base
WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./app/ ./app/
RUN  npm run install-deps; \
     npm run build; \
     npm install;


FROM balenalib/generic-amd64-debian-node:18-bookworm-run-20221215 as dev
WORKDIR /usr/src/app

VOLUME '/usr/src/app'

COPY --from=base /usr/src/app/  /usr/src/app/
COPY . .

EXPOSE 3503

ENV NODE_ENV=development
ENV START_CMD="npm run dev"
CMD ["sh", "-c", "${START_CMD}"]

FROM balenalib/generic-amd64-debian-node:18-bookworm-run-20221215 as prod
WORKDIR /usr/src/app

COPY --from=base /usr/src/app/node_modules  /usr/src/app/node_modules
COPY --from=base /usr/src/app/app/dist /usr/src/app/app/dist
COPY ./media /usr/src/app/media
COPY ./*.js ./
COPY ./*.json ./
COPY ./.env ./.env

LABEL traefik.enable=true
LABEL traefik.http.routers.kiosk.entrypoints=http
LABEL traefik.http.routers.kiosk.rule=PathPrefix(`/kiosk`)
LABEL traefik.http.routers.kiosk.service=kiosk
LABEL traefik.http.services.kiosk.loadbalancer.server.port=3503

EXPOSE 3503

ENV NODE_ENV=production
ENV START_CMD="npm start"
CMD ["sh", "-c", "${START_CMD}"]