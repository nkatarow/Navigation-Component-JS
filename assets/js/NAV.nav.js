/*global $: false, console: false, NAV: true */
/*jslint browser: true, sloppy: true, forin: true, plusplus: true, maxerr: 50, indent: 4 */

/*

    Navigation Component
    VERSION 1.0.0
    AUTHORS: Nick Katarow, Gavin Suntop

    DEPENDENCIES:
    - jQuery 1.7.2
    - NAV.main.js

    Optional To Do List:
    - If three levels deep, remove inner active classes when first level is closed 
    - Only allow a single level 1, 2 or 3 items be active at any given time

*/

NAV.nav = {
    init: function () {
        // fn init
        var self = this,
            key;

        // ELEMENTS
        self.elPrimaryTrigger       = $('<a href="#primary" class="trigger primary-trigger" title="Menu"><img src="assets/svg/menu.svg"></a>');
        self.elCountryTrigger       = $('<a href="#country" class="trigger country-trigger" title="Country"><img src="assets/svg/globe.svg"></a>');
        self.elSearchTrigger        = $('<a href="#search" class="trigger search-trigger" title="Search"><img src="assets/svg/search.svg"></a>');

        self.elPrimaryMenu          = $('#primary');
        self.elCountryMenu          = $('#country');
        self.elSearchMenu           = $('#search');

        self.elSubMenuItem          = $('.has-subnav a');

        // PROPERTIES
        self.isMobile           = false;
        self.visibleMenu        = null;
        self.triggersInserted   = false;

        // SETUP
        if (NAV.getMediaWidth() < 700) {
            self.mobileOn();
        } else {
            self.mobileOff();
        }

        // OBJECTS
        self.menus = {
            primary: {
                $menu: self.elPrimaryMenu,
                $trigger: self.elPrimaryTrigger
            },
            search: {
                $menu: self.elSearchMenu,
                $trigger: self.elSearchTrigger
            },
            country: {
                $menu: self.elCountryMenu,
                $trigger: self.elCountryTrigger
            }
        };

        // EVENT DELEGATION
        function bindTrigger(trigger, menuName) {
            trigger.click(function (event) {
                event.preventDefault();

                if (self.visibleMenu !== menuName) {
                    self.showNav(menuName);
                } else {
                    self.hideNav(menuName);
                }
            });
        }

        for (key in self.menus) {
            bindTrigger(self.menus[key].$trigger, key);
        }
    },
    mobileOn: function () {
        // fn mobileOn
        var self = this;

        if (!self.triggersInserted) {
            self.elPrimaryMenu.before(self.elPrimaryTrigger);
            self.elSearchMenu.before(self.elSearchTrigger);
            self.elCountryMenu.before(self.elCountryTrigger);

            self.triggersInserted = true;
        } else {
            self.elPrimaryTrigger.show();
            self.elSearchTrigger.show();
            self.elCountryTrigger.show();
        }

        self.elSubMenuItem.click(function (event) {
            event.preventDefault();
            $(this).toggleClass('active');
            $(this).next('ul').toggleClass('active');
        });

        self.isMobile = true;
    },
    mobileOff: function () {
        // fn mobileOff
        var self = this;

        if (self.triggersInserted) {
            self.elPrimaryTrigger.hide();
            self.elSearchTrigger.hide();
            self.elCountryTrigger.hide();
        }

        self.isMobile = false;
    },

    hideNav: function (menu) {
        // fn hideNav
        var self = this;

        self.menus[self.visibleMenu].$menu.removeClass('active');
        self.menus[self.visibleMenu].$trigger.removeClass('active');
        self.visibleMenu = null;
    },
    showNav: function (menu) {
        // fn showNav 
        var self = this;

        if (self.visibleMenu !== null) {
            self.hideNav(self.visibleMenu);
        }

        self.menus[menu].$menu.addClass('active');
        self.menus[menu].$trigger.addClass('active');
        self.visibleMenu = menu;
    }
};