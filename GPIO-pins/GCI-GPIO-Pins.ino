//Includes library for the proper functions of LCD
#include <LiquidCrystal.h>
//Includes library for stepper motor
#include <Stepper.h>
// sensor minimum for photocell, 
const int sensorMin = 0;
// sensor maximum values for photocell, 
const int sensorMax = 800;

int lm35Pin = A0; //Initialises Lm35 Temperature sensor to pin A0

int photocellPin = A1; //Initialises photocell sensor to pin A1

//Initialises Ultrasonic sensor pins D2+D3
int echoPin = 2;
int trigPin = 3;

//Initialises all of the LCD pins
int lcdRSPin = 12;
int lcdEPin = 11;
int lcdD4Pin = 7;
int lcdD5Pin = 6;
int lcdD6Pin = 5;
int lcdD7Pin = 4;

//Initialises all of the required stepper motor pins
int stepIN1Pin = 8;
int stepIN2Pin = 9;
int stepIN3Pin = 10;
int stepIN4Pin = 11;

int stepsPerRevolution = 2048;

Stepper myStepper(stepsPerRevolution,
                  stepIN1Pin, stepIN3Pin,
                  stepIN2Pin, stepIN4Pin);

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(lcdRSPin, lcdEPin,
                  lcdD4Pin, lcdD5Pin, lcdD6Pin, lcdD7Pin);
void setup()
{
    // set up serial at 9600 baud   
    Serial.begin(9600);
    
    // set the pinmode on our ultrasonic echo, and tric pins
    pinMode(echoPin, INPUT);
    pinMode(trigPin, OUTPUT);
    
    // set the RPM (for the stepper motor)
    myStepper.setSpeed(10);
    
    // set up the LCD's number of columns and rows: 
    lcd.begin(16, 2);

    // Print a message to the LCD.
    lcd.print("Thank for mentoring, ianuj03!");
}

void loop()
{
    // Sets value types for variables that we'll need for later
    int tempAnalogValue;
    int range;
    int photocellValue;
    float temperature;
    float distanceCentimeters;
    int pulseLenMicroseconds;

    
    // Sets the variable to equal the temperature pin's value, then does math to convert to the actual temperature value in Celcius (Temp sensor)
    tempAnalogValue = analogRead(lm35Pin);
    temperature = float(tempAnalogValue) / 1023;
    temperature = temperature * 500;

    // step one revolution in one direction (Stepper Motor)
    myStepper.step(stepsPerRevolution);
    // wait a second
    delay(100);

    // step one revolution in the other direction (Stepper Motor)
    myStepper.step(-stepsPerRevolution);
    // wait a second
    delay(100);
    
    // Sets variable to equal photocell pin's value (Photoresistor)
    photocellValue = analogRead(photocellPin);
    // Sets sensor range to a range of four options (Photoresistor)
    range = map(photocellValue, sensorMin, sensorMax, 0, 3);


    digitalWrite(trigPin, LOW);
    delayMicroseconds(20);
    digitalWrite(trigPin, HIGH);
    delayMicroseconds(100);
    digitalWrite(trigPin, LOW);

    // measure the pulse length from the echo pin (UltraRangeFinder)
    pulseLenMicroseconds = pulseIn(echoPin, HIGH);

    // Calculates distance using values I found online and stores value in variable (UltraRangeFinder)
    distanceCentimeters = pulseLenMicroseconds / 29.387 / 2;

    // Sets the cursor to column 0, line 1 (LCD)
    lcd.setCursor(0, 1);

    // print the number of seconds since reset (LCD)
    lcd.print(millis() / 1000);

    // Prints whether the light sensor is detecting alot or little light in the serial monitor (Photoresistor)
    switch (range) 
    {
        case 0:
            Serial.println("dark");
            break;
        case 1:
            Serial.println("dim");
            break;
        case 2: 
            Serial.println("medium");
            break;
        case 3:
            Serial.println("bright");
            break;
    }
    delay(1000);
    // Prints temperature in serial monitor
    Serial.print("Temp: ");
    Serial.print(temperature);
    Serial.println("C");
    delay(1000);
    // Prints ultrasonic sensor range to sensor
    Serial.print("Distance-(cm) ");
    Serial.println(distanceCentimeters);
    delay(1000);
}
