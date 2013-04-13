/*global $: false, console: false, VMW: true */
/*jslint browser: true, sloppy: true, forin: true, plusplus: true, maxerr: 50, indent: 4 */

/*

    Main JavaScript
    VERSION 1.0.0
    AUTHORS: Nick Katarow, Gavin Suntop

    DEPENDENCIES:
    - jQuery 1.7.2

    TODO:
    -

*/

window.NAV = {
    init: function () {
        var self = this;

        self.events.parent = this;

        // Init Components
        self.nav.init();
    },
    events: {
        windowResize: function (event) {
            var self = this.parent,
                i,
                ii;

            if (event.width >= 700 && self.nav.isMobile) {
                self.nav.mobileOff();
            } else if (event.width < 700 && !self.nav.isMobile) {
                self.nav.mobileOn();
            }
        } 
    },
    getMediaWidth: function () {
        var self = this,
            width;

        if (typeof matchMedia !== 'undefined') {
            width = self.bruteForceMediaWidth();
        } else {
            width = window.innerWidth || document.documentElement.clientWidth;
        }

        return width;
    },
    bruteForceMediaWidth: function () {
        var i = 0,
            found = false;

        while (!found) {
            if (matchMedia('(width: ' + i + 'px)').matches) {
                found = true;
            } else {
                i++;    
            }

            // Prevent infinite loop if something goes horribly wrong
            if (i === 9999) {
                break;
            }
        }

        return i;
    }
};
