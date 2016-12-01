# sudo docker build -t commute-api:0.1 .
# sudo docker run -d -p 81:5000 -e GOOGLE_MAPS_API_KEY=<GOOGLE_MAPS_API_KEY> -e FLASK_DEBUG=1 commute-api:0.1

FROM python:3.5

RUN pip install gunicorn Flask flask-cors requests

ADD app.py /

ENV FLASK_DEBUG 1
ENV FLASK_APP app.py

CMD gunicorn -w 10 -b 0.0.0.0:5000 app:app
