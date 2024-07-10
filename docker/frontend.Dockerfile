FROM olympeio/frontend-base:latest
COPY --chown=nginx:root $SOURCES_PATH /usr/share/nginx/html