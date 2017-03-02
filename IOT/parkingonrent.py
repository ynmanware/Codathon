import RPi.GPIO as GPIO
import time
import json
import requests

TRIG = 23
ECHO = 24

parkingID = "P-JMROAD-Space-1"
#parkingID = "JM-ROAD-NEW-Park1"
#parkingID = "P-FCRoadFCRoad-space-10341"
#parkingID = "FCRoad"
currentStatus = False
oldStatus = False
stat = "available"

print "In Progress"

print "Waiting for sensor to settle"
time.sleep(2)

GPIO.cleanup()

url='https://urldefense.proofpoint.com/v2/url?u=https-3A__parkingonrent.herokuapp.com_res_spot_-25s&d=BQIGAg&c=3BfiSO86x5iKjpl2b39jud9R1NrKYqPq2js90dwBswk&r=HrkXxT9E3QU7ck03i1eUM1PSqRB8At2t5ieF5XUcOqg&m=LyQPqbVFZctSfG-NjgKvFbE99DmJsp0FAEqBRpYidSk&s=FesPpnSZbDD0nzTHYiVC8uZ5sBIbhvPqQYdz8FUeUjw&e= ' % parkingID
print url
response = requests.get(url)
print (response.text)

time.sleep(1)

if response.text.strip('"') == "busy":
	oldStatus = True

while True:

	time.sleep(0.5)

	GPIO.setmode(GPIO.BCM)
	GPIO.setup(TRIG,GPIO.OUT)
	GPIO.setup(ECHO,GPIO.IN)

	GPIO.output(TRIG,False)
	GPIO.output(TRIG,True)
	time.sleep(0.00001)
	GPIO.output(TRIG,False)

	while GPIO.input(ECHO)==0:
		pulse_start = time.time()

	while GPIO.input(ECHO)==1:
		pulse_end = time.time()

	pulse_duration = pulse_end - pulse_start

	distance =  pulse_duration * 17150

	distance = round(distance,2)

	if distance > 15:
		currentStatus = False
	else:
		currentStatus = True

	if currentStatus == True:
		stat = "busy"	
	else:
		stat = "available"	

	if currentStatus != oldStatus:
		url='https://urldefense.proofpoint.com/v2/url?u=https-3A__parkingonrent.herokuapp.com_res_update&d=BQIGAg&c=3BfiSO86x5iKjpl2b39jud9R1NrKYqPq2js90dwBswk&r=HrkXxT9E3QU7ck03i1eUM1PSqRB8At2t5ieF5XUcOqg&m=LyQPqbVFZctSfG-NjgKvFbE99DmJsp0FAEqBRpYidSk&s=-T8-q1w-EuhTuP82X-wMoEWoNJ1KyXgq22C7LRncnZY&e= '
		data={"spotId":parkingID , "status":stat}
		data_json = json.dumps(data)
		headers = {'Content-type':'application/json'}
		response = requests.post(url,data=data_json,headers=headers)
		oldStatus = currentStatus

	GPIO.cleanup()
