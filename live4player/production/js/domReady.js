/**
 * @license RequireJS domReady 2.0.1 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */
/*jslint */
/*global require: false, define: false, requirejs: false,
  window: false, clearInterval: false, document: false,
  self: false, setInterval: false */


define(function () {
    'use strict';

    var isTop, testDiv, scrollIntervalId,
        isBrowser = typeof window !== "undefined" && window.document,
        isPageLoaded = !isBrowser,
        doc = isBrowser ? document : null,
        readyCalls = [];

    function runCallbacks(callbacks) {
        var i;
        for (i = 0; i < callbacks.length; i += 1) {
            callbacks[i](doc);
        }
    }

    function callReady() {
        var callbacks = readyCalls;

        if (isPageLoaded) {
            //Call the DOM ready callbacks
            if (callbacks.length) {
                readyCalls = [];
                runCallbacks(callbacks);
            }
        }
    }

    /**
     * Sets the page as loaded.
     */
    function pageLoaded() {
        if (!isPageLoaded) {
            isPageLoaded = true;
            if (scrollIntervalId) {
                clearInterval(scrollIntervalId);
            }

            callReady();
        }
    }

    if (isBrowser) {
        if (document.addEventListener) {
            //Standards. Hooray! Assumption here that if standards based,
            //it knows about DOMContentLoaded.
            document.addEventListener("DOMContentLoaded", pageLoaded, false);
            window.addEventListener("load", pageLoaded, false);
        } else if (window.attachEvent) {
            window.attachEvent("onload", pageLoaded);

            testDiv = document.createElement('div');
            try {
                isTop = window.frameElement === null;
            } catch (e) {}

            //DOMContentLoaded approximation that uses a doScroll, as found by
            //Diego Perini: http://javascript.nwbox.com/IEContentLoaded/,
            //but modified by other contributors, including jdalton
            if (testDiv.doScroll && isTop && window.external) {
                scrollIntervalId = setInterval(function () {
                    try {
                        testDiv.doScroll();
                        pageLoaded();
                    } catch (e) {}
                }, 30);
            }
        }

        //Check if document already complete, and if so, just trigger page load
        //listeners. Latest webkit browsers also use "interactive", and
        //will fire the onDOMContentLoaded before "interactive" but not after
        //entering "interactive" or "complete". More details:
        //http://dev.w3.org/html5/spec/the-end.html#the-end
        //http://stackoverflow.com/questions/3665561/document-readystate-of-interactive-vs-ondomcontentloaded
        //Hmm, this is more complicated on further use, see "firing too early"
        //bug: https://github.com/requirejs/domReady/issues/1
        //so removing the || document.readyState === "interactive" test.
        //There is still a window.onload binding that should get fired if
        //DOMContentLoaded is missed.
        if (document.readyState === "complete") {
            pageLoaded();
        }
    }

    /** START OF PUBLIC API **/

    /**
     * Registers a callback for DOM ready. If DOM is already ready, the
     * callback is called immediately.
     * @param {Function} callback
     */
    function domReady(callback) {
        if (isPageLoaded) {
            callback(doc);
        } else {
            readyCalls.push(callback);
        }
        return domReady;
    }

    domReady.version = '2.0.1';

    /**
     * Loader Plugin API method
     */
    domReady.load = function (name, req, onLoad, config) {
        if (config.isBuild) {
            onLoad(null);
        } else {
            domReady(onLoad);
        }
    };

    /** END OF PUBLIC API **/

    return domReady;
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tUmVhZHkuanMiLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkb21SZWFkeS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlIFJlcXVpcmVKUyBkb21SZWFkeSAyLjAuMSBDb3B5cmlnaHQgKGMpIDIwMTAtMjAxMiwgVGhlIERvam8gRm91bmRhdGlvbiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICogQXZhaWxhYmxlIHZpYSB0aGUgTUlUIG9yIG5ldyBCU0QgbGljZW5zZS5cbiAqIHNlZTogaHR0cDovL2dpdGh1Yi5jb20vcmVxdWlyZWpzL2RvbVJlYWR5IGZvciBkZXRhaWxzXG4gKi9cbi8qanNsaW50ICovXG4vKmdsb2JhbCByZXF1aXJlOiBmYWxzZSwgZGVmaW5lOiBmYWxzZSwgcmVxdWlyZWpzOiBmYWxzZSxcbiAgd2luZG93OiBmYWxzZSwgY2xlYXJJbnRlcnZhbDogZmFsc2UsIGRvY3VtZW50OiBmYWxzZSxcbiAgc2VsZjogZmFsc2UsIHNldEludGVydmFsOiBmYWxzZSAqL1xuXG5cbmRlZmluZShmdW5jdGlvbiAoKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgdmFyIGlzVG9wLCB0ZXN0RGl2LCBzY3JvbGxJbnRlcnZhbElkLFxuICAgICAgICBpc0Jyb3dzZXIgPSB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5kb2N1bWVudCxcbiAgICAgICAgaXNQYWdlTG9hZGVkID0gIWlzQnJvd3NlcixcbiAgICAgICAgZG9jID0gaXNCcm93c2VyID8gZG9jdW1lbnQgOiBudWxsLFxuICAgICAgICByZWFkeUNhbGxzID0gW107XG5cbiAgICBmdW5jdGlvbiBydW5DYWxsYmFja3MoY2FsbGJhY2tzKSB7XG4gICAgICAgIHZhciBpO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBjYWxsYmFja3NbaV0oZG9jKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGxSZWFkeSgpIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrcyA9IHJlYWR5Q2FsbHM7XG5cbiAgICAgICAgaWYgKGlzUGFnZUxvYWRlZCkge1xuICAgICAgICAgICAgLy9DYWxsIHRoZSBET00gcmVhZHkgY2FsbGJhY2tzXG4gICAgICAgICAgICBpZiAoY2FsbGJhY2tzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlYWR5Q2FsbHMgPSBbXTtcbiAgICAgICAgICAgICAgICBydW5DYWxsYmFja3MoY2FsbGJhY2tzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIHBhZ2UgYXMgbG9hZGVkLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBhZ2VMb2FkZWQoKSB7XG4gICAgICAgIGlmICghaXNQYWdlTG9hZGVkKSB7XG4gICAgICAgICAgICBpc1BhZ2VMb2FkZWQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHNjcm9sbEludGVydmFsSWQpIHtcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNjcm9sbEludGVydmFsSWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjYWxsUmVhZHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0Jyb3dzZXIpIHtcbiAgICAgICAgaWYgKGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIC8vU3RhbmRhcmRzLiBIb29yYXkhIEFzc3VtcHRpb24gaGVyZSB0aGF0IGlmIHN0YW5kYXJkcyBiYXNlZCxcbiAgICAgICAgICAgIC8vaXQga25vd3MgYWJvdXQgRE9NQ29udGVudExvYWRlZC5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIHBhZ2VMb2FkZWQsIGZhbHNlKTtcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwibG9hZFwiLCBwYWdlTG9hZGVkLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAod2luZG93LmF0dGFjaEV2ZW50KSB7XG4gICAgICAgICAgICB3aW5kb3cuYXR0YWNoRXZlbnQoXCJvbmxvYWRcIiwgcGFnZUxvYWRlZCk7XG5cbiAgICAgICAgICAgIHRlc3REaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaXNUb3AgPSB3aW5kb3cuZnJhbWVFbGVtZW50ID09PSBudWxsO1xuICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cblxuICAgICAgICAgICAgLy9ET01Db250ZW50TG9hZGVkIGFwcHJveGltYXRpb24gdGhhdCB1c2VzIGEgZG9TY3JvbGwsIGFzIGZvdW5kIGJ5XG4gICAgICAgICAgICAvL0RpZWdvIFBlcmluaTogaHR0cDovL2phdmFzY3JpcHQubndib3guY29tL0lFQ29udGVudExvYWRlZC8sXG4gICAgICAgICAgICAvL2J1dCBtb2RpZmllZCBieSBvdGhlciBjb250cmlidXRvcnMsIGluY2x1ZGluZyBqZGFsdG9uXG4gICAgICAgICAgICBpZiAodGVzdERpdi5kb1Njcm9sbCAmJiBpc1RvcCAmJiB3aW5kb3cuZXh0ZXJuYWwpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxJbnRlcnZhbElkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVzdERpdi5kb1Njcm9sbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZUxvYWRlZCgpO1xuICAgICAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgICAgIH0sIDMwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vQ2hlY2sgaWYgZG9jdW1lbnQgYWxyZWFkeSBjb21wbGV0ZSwgYW5kIGlmIHNvLCBqdXN0IHRyaWdnZXIgcGFnZSBsb2FkXG4gICAgICAgIC8vbGlzdGVuZXJzLiBMYXRlc3Qgd2Via2l0IGJyb3dzZXJzIGFsc28gdXNlIFwiaW50ZXJhY3RpdmVcIiwgYW5kXG4gICAgICAgIC8vd2lsbCBmaXJlIHRoZSBvbkRPTUNvbnRlbnRMb2FkZWQgYmVmb3JlIFwiaW50ZXJhY3RpdmVcIiBidXQgbm90IGFmdGVyXG4gICAgICAgIC8vZW50ZXJpbmcgXCJpbnRlcmFjdGl2ZVwiIG9yIFwiY29tcGxldGVcIi4gTW9yZSBkZXRhaWxzOlxuICAgICAgICAvL2h0dHA6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMvdGhlLWVuZC5odG1sI3RoZS1lbmRcbiAgICAgICAgLy9odHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM2NjU1NjEvZG9jdW1lbnQtcmVhZHlzdGF0ZS1vZi1pbnRlcmFjdGl2ZS12cy1vbmRvbWNvbnRlbnRsb2FkZWRcbiAgICAgICAgLy9IbW0sIHRoaXMgaXMgbW9yZSBjb21wbGljYXRlZCBvbiBmdXJ0aGVyIHVzZSwgc2VlIFwiZmlyaW5nIHRvbyBlYXJseVwiXG4gICAgICAgIC8vYnVnOiBodHRwczovL2dpdGh1Yi5jb20vcmVxdWlyZWpzL2RvbVJlYWR5L2lzc3Vlcy8xXG4gICAgICAgIC8vc28gcmVtb3ZpbmcgdGhlIHx8IGRvY3VtZW50LnJlYWR5U3RhdGUgPT09IFwiaW50ZXJhY3RpdmVcIiB0ZXN0LlxuICAgICAgICAvL1RoZXJlIGlzIHN0aWxsIGEgd2luZG93Lm9ubG9hZCBiaW5kaW5nIHRoYXQgc2hvdWxkIGdldCBmaXJlZCBpZlxuICAgICAgICAvL0RPTUNvbnRlbnRMb2FkZWQgaXMgbWlzc2VkLlxuICAgICAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiKSB7XG4gICAgICAgICAgICBwYWdlTG9hZGVkKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogU1RBUlQgT0YgUFVCTElDIEFQSSAqKi9cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNhbGxiYWNrIGZvciBET00gcmVhZHkuIElmIERPTSBpcyBhbHJlYWR5IHJlYWR5LCB0aGVcbiAgICAgKiBjYWxsYmFjayBpcyBjYWxsZWQgaW1tZWRpYXRlbHkuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2tcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkb21SZWFkeShjYWxsYmFjaykge1xuICAgICAgICBpZiAoaXNQYWdlTG9hZGVkKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhkb2MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVhZHlDYWxscy5wdXNoKGNhbGxiYWNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZG9tUmVhZHk7XG4gICAgfVxuXG4gICAgZG9tUmVhZHkudmVyc2lvbiA9ICcyLjAuMSc7XG5cbiAgICAvKipcbiAgICAgKiBMb2FkZXIgUGx1Z2luIEFQSSBtZXRob2RcbiAgICAgKi9cbiAgICBkb21SZWFkeS5sb2FkID0gZnVuY3Rpb24gKG5hbWUsIHJlcSwgb25Mb2FkLCBjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5pc0J1aWxkKSB7XG4gICAgICAgICAgICBvbkxvYWQobnVsbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkb21SZWFkeShvbkxvYWQpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKiBFTkQgT0YgUFVCTElDIEFQSSAqKi9cblxuICAgIHJldHVybiBkb21SZWFkeTtcbn0pO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9