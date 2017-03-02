import RPi.GPIO as GPIO
import time
import json
import requests

TRIG = 18
ECHO = 25

spaceID = "FCROAD-Space-1"
available_count = 0

print "In Progress"

print "Waiting for sensor to settle"
time.sleep(2)

GPIO.cleanup()

while True:
	time.sleep(1)

	GPIO.setmode(GPIO.BCM)
	GPIO.setup(TRIG,GPIO.OUT)
	GPIO.setup(ECHO,GPIO.IN)

	time.sleep(0.5)

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

	if distance <= 15:
		url='https://urldefense.proofpoint.com/v2/url?u=https-3A__parkingonrent.herokuapp.com_api_parkingspace_count_-25s&d=BQIGAg&c=3BfiSO86x5iKjpl2b39jud9R1NrKYqPq2js90dwBswk&r=HrkXxT9E3QU7ck03i1eUM1PSqRB8At2t5ieF5XUcOqg&m=bfZe3gMHKcM2KOE8hHdkNi3eFpV6_OKuGCc9GHETYkU&s=-ck_oqsHpQTdfLzRq78JWMiba7641TPgVUlhBWce6jQ&e= ' % spaceID
		data={"status":"available"}
		data_json = json.dumps(data)
		headers = {'Content-type':'application/json'}
		response = requests.post(url,data=data_json,headers=headers)

	GPIO.cleanup()
