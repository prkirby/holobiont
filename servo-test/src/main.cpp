#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

int servonum = 0;
char command = ' ';
unsigned int pulse = 0;

// Servo Drivers
Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

void setup() {
        // put your setup code here, to run once:
        pwm.begin();
        pwm.setPWMFreq(60);

        Serial.begin(115200);

}

void loop() {

        if ( Serial.available() > 0) {
                command = Serial.read();

                if (command == 's') {
                        servonum = Serial.parseInt();
                        pulse = Serial.parseInt();
                        pwm.setPWM(servonum, 0, pulse);
                }
        }
}
