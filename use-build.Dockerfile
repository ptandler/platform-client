FROM nginx

RUN apt-get update && \
    apt-get install --no-install-recommends -y python3-pip python3-setuptools python3-yaml && \
    pip install 'jinja-cli==1.2.1' && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ARG HTTP_PORT=8080

WORKDIR /usr/share/nginx/html
COPY ./build ./app/config.js.j2 ./app/config.json.j2 ./
COPY docker/nginx.default.conf /etc/nginx/conf.d/default.conf
COPY docker/nginx.run.sh /nginx.run.sh
RUN sed -i 's/$HTTP_PORT/'$HTTP_PORT'/' /etc/nginx/conf.d/default.conf && \
    mkdir /var/lib/nginx && \
    chgrp -R 0 . /var/lib/nginx /run && \
    chmod -R g+rwX . /var/lib/nginx /run && \
    ln -sf /dev/stdout /var/log/nginx/access.log && \
    ln -sf /dev/stderr /var/log/nginx/error.log

ENV HTTP_PORT=$HTTP_PORT
EXPOSE $HTTP_PORT

ENTRYPOINT [ "/bin/sh", "/nginx.run.sh" ]
CMD [ "/usr/sbin/nginx", "-g", "daemon off;" ]
