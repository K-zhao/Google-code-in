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
    # Setting the API Key while inputing Temperature and Humidity Values to Thingspeak
    baseURL = "http://api.thingspeak.com/update?api_key=AP8KDTTOGBDP69ES&field1=%d&field2=%d" % (Temperature, Humidity)
    f = urllib2.urlopen(baseURL)
    f.read()
    f.close()
    # Checking whether the sensor is actually giving correct values
    print(Temperature)
    print(Humidity)
    time.sleep(2)