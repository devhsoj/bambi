FROM node:18-alpine AS BUILD_IMAGE

WORKDIR /opt/bambi-build/

COPY . .

RUN npm i
RUN npm run build
RUN npm prune --production

FROM node:18-alpine

WORKDIR /opt/bambi

COPY --from=BUILD_IMAGE /opt/bambi-build/node_modules node_modules/
COPY --from=BUILD_IMAGE /opt/bambi-build/package*.json .
COPY --from=BUILD_IMAGE /opt/bambi-build/public public/
COPY --from=BUILD_IMAGE /opt/bambi-build/build build/
COPY --from=BUILD_IMAGE /opt/bambi-build/app/lib/db/sql/ app/lib/db/sql/
COPY --from=BUILD_IMAGE /opt/bambi-build/scripts/ scripts/

ARG USERNAME=admin
ARG PASSWORD=admin
ARG BCRYPT_ROUNDS=14

RUN node scripts/add-user.js ${USERNAME} ${PASSWORD} ${BCRYPT_ROUNDS}

EXPOSE 3000

CMD ["npm", "start"]