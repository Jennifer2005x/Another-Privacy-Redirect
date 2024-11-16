// ==UserScript==
// @name         Another Privacy Redirect
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Redirecciona sitios populares a frontends más privados
// @author       @Jennifer2005x
// @match        *://*.youtube.com/*
// @match        *://*.twitter.com/*
// @match        *://*.x.com/*
// @match        *://*.instagram.com/*
// @match        *://*.reddit.com/*
// @match        *://*.tiktok.com/*
// @grant        none
// @run-at       document-start
// @inject-into  page
// ==/UserScript==

(function() {
    'use strict';

    const redirects = new Map([
        ['www.youtube.com', 'inv.nadeko.net'],
        ['youtube.com', 'inv.nadeko.net'],
        ['m.youtube.com', 'inv.nadeko.net'],
        ['music.youtube.com', 'music.adminforge.de'],
        ['twitter.com', 'xcancel.com'],
        ['x.com', 'xcancel.com'],
        ['www.reddit.com', 'l.opnxng.com'],
        ['reddit.com', 'l.opnxng.com'],
        ['www.instagram.com', 'ig.opnxng.com'],
        ['instagram.com', 'ig.opnxng.com'],
        ['www.tiktok.com', 'offtiktok.com']
    ]);

    try {
        window.stop();
        
        const currentHost = window.location.hostname.toLowerCase();
        const newHost = redirects.get(currentHost);
        
        if (newHost) {
            const newUrl = 'https://' + newHost + window.location.pathname + window.location.search + window.location.hash;
            
            if (window.location.href !== newUrl) {
                window.addEventListener('beforescriptexecute', e => e.preventDefault(), true);
                
                if (window.performance && window.performance.navigation) {
                    window.performance.navigation.type = 1;
                }
                
                window.location.replace(newUrl);
            }
        }
    } catch (e) {
        const newHost = redirects.get(window.location.hostname.toLowerCase());
        if (newHost) {
            window.location.replace('https://' + newHost + window.location.pathname + window.location.search + window.location.hash);
        }
    }
})();