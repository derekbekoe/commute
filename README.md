# commute

## Steps

1. Get a Google Maps API Key
    https://developers.google.com/maps/

For the API server the GOOGLE_MAPS_API_KEY env var needs to be set.
For the Frontend server the COMMUTE_API env var needs to be set.

## Creating with az

```
az vm create -g <RG> -n <NAME> --image UbuntuLTS

az vm open-port -g <RG> -n <NAME>

ssh <ip-address>

sudo apt-get update && sudo apt-get install git

curl -sSL https://get.docker.com/ | sh

wget https://bootstrap.pypa.io/get-pip.py

sudo python get-pip.py

sudo pip install docker-compose
```

(Use the build docker compose file.)

Modify API be for Google Maps API.

Modify COMMUTE_API to e.g. http://23.99.51.64:81

docker-compose up
