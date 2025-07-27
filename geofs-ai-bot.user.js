// ==UserScript==
// @name         GeoFS AI Bot
// @namespace    https://yourgithubusername.github.io/
// @version      0.1
// @description  Basic AI bot to take off, fly, and land in GeoFS
// @author       You
// @match        https://www.geo-fs.com/*
// @grant        none
// @run-at       document-idle
// @updateURL    https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/geofs-ai-bot/main/geofs-ai-bot.user.js
// @downloadURL  https://raw.githubusercontent.com/YOUR_GITHUB_USERNAME/geofs-ai-bot/main/geofs-ai-bot.user.js
// ==/UserScript==

(function () {
    'use strict';

    const bot = {
        isActive: false,
        interval: null,

        takeOff() {
            console.log("AI Takeoff Starting...");
            geofs.api.aircraft.setThrottle(1);
            geofs.api.aircraft.setBrake(0);
            geofs.api.aircraft.setFlaps(1);
            // Basic AI logic
            this.interval = setInterval(() => {
                let alt = geofs.api.aircraft.instance.lla[2];
                let speed = geofs.api.aircraft.instance.airSpeed;
                if (speed > 70) {
                    geofs.api.aircraft.setElevator(1); // pitch up
                }
                if (alt > 300) {
                    geofs.api.aircraft.setElevator(0.2); // level off
                    geofs.api.aircraft.setFlaps(0); // retract flaps
                    clearInterval(this.interval);
                    console.log("Takeoff complete");
                }
            }, 100);
        },

        start() {
            if (!this.isActive) {
                this.isActive = true;
                this.takeOff();
            }
        }
    };

    // Key bind: press "T" to start takeoff
    document.addEventListener("keydown", function(e) {
        if (e.key.toLowerCase() === "t") {
            bot.start();
        }
    });

})();
