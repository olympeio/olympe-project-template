FROM olympeio/nginx:latest
COPY --chown=nginx:root $SOURCES_PATH /usr/share/nginx/html