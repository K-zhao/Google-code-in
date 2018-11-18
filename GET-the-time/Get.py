from urllib.request import urlopen
import json

url = urlopen("http://worldtimeapi.org/api/ip").read()
result = json.loads(url)
dateandtime = result['datetime']
date = dateandtime[0:10]
time = dateandtime[11:19]
print (result["timezone"], date, time)