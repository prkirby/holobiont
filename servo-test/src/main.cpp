#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

int servoNum = 0;
char command = ' ';
unsigned int pulse = 0;

// Servo Drivers
Adafruit_PWMServoDriver pwm1 = Adafruit_PWMServoDriver(0x40);
Adafruit_PWMServoDriver pwm2= Adafruit_PWMServoDriver(0x41);

void setup() {
        // put your setup code here, to run once:
        pwm1.begin();
        pwm1.setPWMFreq(60);

        pwm2.begin();
        pwm2.setPWMFreq(60);

        Serial.begin(115200);

}

void loop() {

        if ( Serial.available() > 0) {
                command = Serial.read();

                if (command == 's') {
                        servoNum = Serial.parseInt();
                        pulse = Serial.parseInt();

                        if (servoNum >= 0 && servoNum <= 15) {
                          pwm1.setPWM(servoNum, 0, pulse);
                        } else if (servoNum >= 16 && servoNum <= 31) {
                          pwm2.setPWM(servoNum - 16, 0, pulse);
                        }
                }
        }
}
