FROM node

ENV APP_DIR=/app
ENV TEMPLATE_REPO=""
ENV TEMPLATE_DIR=/app/templates

EXPOSE 3000

RUN git clone https://github.com/shyim/mjml-server.git ${APP_DIR} \
    && cd ${APP_DIR} && npm i

COPY entrypoint.sh /entrypoint.sh
COPY index.js ${APP_DIR}/
COPY templates ${TEMPLATE_DIR}

WORKDIR ${APP_DIR}

ENTRYPOINT [ "/entrypoint.sh" ]

CMD [ "node", "index.js" ]
