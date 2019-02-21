#include <FastLED.h>
#define NUM_LEDS 4
#define DATA_PIN 6
#define POT_PIN 0

CRGB leds[NUM_LEDS];
int val;
int lednum;
int r;
int g;
int b;
char command = ' ';

void setup() {
        // put your setup code here, to run once:
        FastLED.addLeds<WS2812B, DATA_PIN>(leds, NUM_LEDS);

//        Serial.begin(38400);
}

void loop() {

for (int i = 0; i < 255; i++) {
  leds[0].setRGB(i, i, i);
  leds[1].setRGB(i, i, i);
  leds[2].setRGB(i, i, i);
  leds[3].setRGB(i, i, i);
  FastLED.show();
  delay(10);
}

for (int i = 255; i > 0; i--) {
  leds[0].setRGB(i, i, i);
  leds[1].setRGB(i, i, i);
  leds[2].setRGB(i, i, i);
  leds[3].setRGB(i, i, i);
  FastLED.show();
  delay(10);
}
//
//        if ( Serial.available() > 5 ) {
//                command = Serial.read();
//
//                if (command == 'L') {
//                        lednum = Serial.parseInt();
//                        r = Serial.parseInt();
//                        g = Serial.parseInt();
//                        b = Serial.parseInt();
//
//                        leds[lednum].setRGB(r, g, b);
//                        FastLED.show();
//                }
//        }
}
