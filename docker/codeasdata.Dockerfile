FROM olympeio/codeasdata-base:latest
COPY --chown=1000:1000 $SOURCES_PATH /root/patches
RUN chmod 775 ~/patches
RUN chown -R 1000:1000 ~/patches
