import RPi.GPIO as GPIO
import dht11
import time
import datetime
import urllib2


# initialize GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

# read data using pin 14
instance = dht11.DHT11(pin=14)

while True:
    result = instance.read()
    Temperature = result.temperature
    Humidity = result.humidity
    print(Temperature)
    print(Humidity)
    time.sleep(5)