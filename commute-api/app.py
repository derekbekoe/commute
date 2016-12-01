import os
import logging
import requests
from flask import Flask, jsonify, request
from flask_cors import cross_origin

VERSION = '0.0.1'

app = Flask(__name__)

GOOGLE_MAPS_API_KEY = os.environ.get('GOOGLE_MAPS_API_KEY')

if not GOOGLE_MAPS_API_KEY:
    print("ERROR: No GOOGLE_MAPS_API_KEY specified!")
    print("Shutting down!")
    sys.exit(1)

logging.getLogger('flask_cors').level = logging.DEBUG

@app.route("/")
def hello():
    return jsonify(version=VERSION, message='All systems are go!')

@app.route('/travel-time', methods=['GET'])
@cross_origin()
def travel_time():
    origin = request.args.get('origin')
    destination = request.args.get('destination')
    request_fmt = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins={}&destinations={}&key={}'.format(origin, destination, GOOGLE_MAPS_API_KEY)
    r = requests.get(request_fmt).json()
    element = r['rows'][0]['elements'][0]['duration']
    data = {
        'time_str': element['text'],
        'time_secs': element['value'],
        'origin_address': r['origin_addresses'][0],
        'destination_address': r['destination_addresses'][0]
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run()
