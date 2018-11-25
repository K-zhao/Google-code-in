from urllib.request import urlopen
import RPi.GPIO as GPIO
import dht11
import time
import datetime
import urllib
import json

# initialize GPIO
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BCM)
GPIO.cleanup()

# read data using pin 14
instance = dht11.DHT11(pin=14)



while True:
    sensor = instance.read()
    Temperature = sensor.temperature
    Humidity = sensor.humidity

    # Setting the API Key while inputing Temperature and Humidity Values to Thingspeak
    baseURL = "http://api.thingspeak.com/update?api_key=AP8KDTTOGBDP69ES&field1=%d&field2=%d" % (Temperature, Humidity)
    f = urllib.request.urlopen(baseURL)
    f.read()
    f.close()
    time.sleep(2)

    # Grabs data from Thingspeak
    temperatureURL = urlopen("https://api.thingspeak.com/channels/630475/fields/1/last.json").read()
    humidityURL = urlopen("https://api.thingspeak.com/channels/630475/fields/2/last.json").read()
    result_temp = json.loads(temperatureURL.decode('utf-8'))
    result_hmd = json.loads(humidityURL.decode('utf-8'))

    # Pulls date and time when the data was created
    dateandtime = result_temp['created_at']
    current_date = dateandtime[0:10]
    current_time = dateandtime[11:19]
    
    # Prints when data was created, as well as Temperature and Humidity
    print("Latest data from Thingspeak:", current_date, current_time, "Temperature:", result_temp["field1"], "C", "Humidity:", result_hmd["field2"],"%")
    time.sleep(2)