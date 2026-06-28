/*
    * Title: iOS Talsec FreeRASP Flutter Bypass Frida Script
    * Vulnerable RASP: https://github.com/talsec/Free-RASP-Flutter
    * Author: @ItsFadinG_
    * Blog: https://itsfading.github.io

Fun fact: This entire iOS FreeRASP bypass PoC was almost generated entirely by GLM-4.7
*/

console.log("[*] Initializing iOS FreeRASP Bypass...");

if (ObjC.available) {
    var plugin = ObjC.classes["freerasp.SwiftFreeraspPlugin"];
    
    // 1. NEUTRALIZE EVENT CHANNEL (SINK)
    if (plugin['- onListenWithArguments:eventSink:']) {
        Interceptor.attach(plugin['- onListenWithArguments:eventSink:'].implementation, {
            onEnter: function(args) {
                console.log("[INTERCEPT] EventChannel onListen triggered. Neutralizing event sink.");
                var safeDummySink = new ObjC.Block({
                    retType: 'void',
                    argTypes: ['object'],
                    implementation: function(event) {
                        var type = "null";
                        var val = "null";
                        if (event !== null && event !== undefined) {
                            try { type = event.$className || typeof event; } catch(e) {}
                            try { val = event.toString(); } catch(e) { val = "[Unreadable]"; }
                        }
                        console.log("[BLOCKED] Threat Event -> Type: " + type + " | Value: " + val);
                    }
                });           
                // Replace the original sink with our dummy block
                args[3] = safeDummySink.handle;
            }
        });
        
        console.log("[+] EventChannel bypass active.");
    }
    
    // 2. MONITOR METHOD CALLS (PASSIVE)
    if (plugin['- handleMethodCall:result:']) {
        Interceptor.attach(plugin['- handleMethodCall:result:'].implementation, {
            onEnter: function(args) {
                var call = new ObjC.Object(args[2]);
                console.log("[METHOD] " + call.method());
            }
        });
        
        console.log("[+] Method call monitor active.");
    }
    console.log("[+] Bypass loaded successfully.");
}
