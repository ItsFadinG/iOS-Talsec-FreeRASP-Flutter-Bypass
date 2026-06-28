# iOS-Talsec-FreeRASP-Flutter-Bypass
Proof-of-concept bypass for the iOS implementation of the Talsec FreeRASP Flutter plugin.

The FreeRASP Flutter plugin for iOS relies on a Flutter EventChannel to forward security threat alerts from the native iOS layer to the Dart application layer. Due to the absence of integrity validation on the native callback responsible for forwarding these events, the callback can be replaced at runtime before being stored by the plugin.

As a result, the plugin continues detecting threats internally while the Flutter application never receives any security alerts, effectively disabling runtime protection silently and without causing visible crashes or errors.
## Usage
```
# Via Firda Codeshare
frida -U -f <bundle_identifier> --codeshare ItsFadinG/ios-talsec-freerasp-flutter-bypass
# Locally
frida -U -f <bundle_identifier> -l ios-freerasp-flutter-bypass.js
```
## Frida CodeShare
The Frida implementation of this PoC is also available on Frida CodeShare:
https://codeshare.frida.re/@ItsFadinG/ios-talsec-freerasp-flutter-bypass/

## Credits
Research and PoC by GLM-4.7 :)
