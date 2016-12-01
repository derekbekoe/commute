import os
import logging
import requests
import time
from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

VERSION = '0.1'

app = Flask(__name__)

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

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
    departure_time = request.args.get('departure_time', int(time.time()))
    request_fmt = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins={}&destinations={}&traffic_model=best_guess&departure_time={}&key={}'.format(origin, destination, departure_time, GOOGLE_MAPS_API_KEY)
    r = requests.get(request_fmt).json()
    print(r)
    no_traffic_element = r['rows'][0]['elements'][0]['duration']
    traffic_element = r['rows'][0]['elements'][0]['duration_in_traffic']
    data = {
        'time_str': no_traffic_element['text'],
        'time_secs': no_traffic_element['value'],
        'traffic_time_str': traffic_element['text'],
        'traffic_time_secs': traffic_element['value'],
        'origin_address': r['origin_addresses'][0],
        'destination_address': r['destination_addresses'][0]
    }
    return jsonify(data)

@app.route('/place-autocomplete', methods=['GET'])
@cross_origin()
def place_complete():
    query = request.args.get('query')
    request_fmt = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query={}&key={}'.format(query, GOOGLE_MAPS_API_KEY)
    r = requests.get(request_fmt).json()
    print(r)
    places = [p['formatted_address'] for p in r['results']]
    data = {
        'places': places
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run()
