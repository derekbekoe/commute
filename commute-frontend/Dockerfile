# sudo docker build -t commute-frontend:0.1 .
# sudo docker run -d -p 80:80 -e COMMUTE_API=http://40.83.187.34:81 commute-frontend:0.1

FROM kyma/docker-nginx
COPY src/ /var/www
CMD [ -z "$COMMUTE_API" ] && echo "Need to set COMMUTE_API" && exit 1; \
    echo "COMMUTE_API = $COMMUTE_API;" >> /var/www/assets/js/custom.js; \
    'nginx'
