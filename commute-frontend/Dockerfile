# sudo docker build -t commute-frontend:1 .
# sudo docker run -d -p 80:80 commute-frontend:1

FROM kyma/docker-nginx
COPY src/ /var/www
# CMD sed 's/COMMUTE_API/'$COMMUTE_API'/' -i /var/www/assets/js/main.js; \
#     'nginx'

CMD 'nginx'
