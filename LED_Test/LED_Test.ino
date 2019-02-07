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
  FastLED.addLeds<NEOPIXEL, DATA_PIN>(leds, NUM_LEDS);

  Serial.begin(38400);
}

void loop() {

  if ( Serial.available() > 0 ) {
        command = Serial.read();

      if (command == 'L') {
        lednum = Serial.parseInt();
        r = Serial.parseInt();
        g = Serial.parseInt();
        b = Serial.parseInt();

        leds[lednum].setRGB(g, r, b);
        FastLED.show();
      }
    }

//  val = analogRead(POT_PIN);
//  val = map(val, 0, 1023, 0, 255);
  
  // put your main code here, to run repeatedly:
//  leds[0].setRGB(val, val, val);
//  FastLED.show();
//  delay(10);
//
//  leds[0] = CRGB::Black;
//  FastLED.show();
//  delay(500);

//  leds[1].setRGB(val, val, val);
//  FastLED.show();
//  delay(10);
//
//  leds[1] = CRGB::Black;
//  FastLED.show();
//  delay(20);
}
