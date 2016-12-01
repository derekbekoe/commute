# BUILD LIKE THIS
# sudo docker build -t <image_name>:<version> .
# sudo docker run -p <host_ip>:5000 -e GOOGLE_MAPS_API_KEY=<GOOGLE_MAPS_API_KEY> <image_name>:<version>

FROM python:3.5

RUN pip install gunicorn Flask flask-cors requests

ADD app.py /

ENV FLASK_APP app.py

CMD gunicorn -w 10 -b 0.0.0.0:5000 app:app
