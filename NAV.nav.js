/*global $: false, console: false, VMW: true */
/*jslint browser: true, sloppy: true, forin: true, plusplus: true, maxerr: 50, indent: 4 */

/*

    Navigation Component
    VERSION 1.0.0
    AUTHORS: Nick Katarow, Gavin Suntop

    DEPENDENCIES:
    - NAV.main.js
    - jQuery 1.7.2

    TODO:
    -
    
*/

VMW.nav = {
    init: function () {
        // fn init
        var self = this,
            key;

        // ELEMENTS
        self.elPrimaryTrigger       = $('<a href="#menu-primary" class="menu-link menu-link-primary">Menu</a>');
        self.elSearchTrigger        = $('<a href="#menu-search" class="menu-link menu-link-search">Menu</a>');
        self.elQuickLinksTrigger    = $('<a href="#menu-quick" class="menu-link menu-link-eyebrow menu-link-quick">Quick Links</a>');
        self.elShareTrigger         = $('<a href="#menu-share" class="menu-link menu-link-eyebrow menu-link-share">Share</a>');
        self.elSubMenuItem          = $('.has-subnav > a');
        self.elPrimaryMenu          = $('#menu-primary');
        self.elSearchMenu           = $('#menu-search');
        self.elQuickLinksMenu       = $('#menu-quick');
        self.elShareMenu            = $('#menu-share');

        // PROPERTIES
        self.isMobile           = false;
        self.visibleMenu        = null;
        self.triggersInserted   = false;

        // SETUP
        if (VMW.getMediaWidth() < 700) {
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
            quick: {
                $menu: self.elQuickLinksMenu,
                $trigger: self.elQuickLinksTrigger
            },
            share: {
                $menu: self.elShareMenu,
                $trigger: self.elShareTrigger
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
            self.elQuickLinksMenu.before(self.elQuickLinksTrigger);
            self.elShareMenu.before(self.elShareTrigger);

            self.triggersInserted = true;
        } else {
            self.elPrimaryTrigger.show();
            self.elSearchTrigger.show();
            self.elQuickLinksTrigger.show();
            self.elShareTrigger.show();
        }

        self.elSubMenuItem.click(function (event) {
            event.preventDefault();
            $(this).toggleClass('is-active');
            $(this).next('ul').toggleClass('is-active');
            $(this).next('ul').children().children('.has-subnav').children('ul').toggleClass('is-active');
        });

        self.isMobile = true;
    },
    mobileOff: function () {
        // fn mobileOff
        var self = this;

        if (self.triggersInserted) {
            self.elPrimaryTrigger.hide();
            self.elSearchTrigger.hide();
            self.elQuickLinksTrigger.hide();
            self.elShareTrigger.hide();
        }

        self.isMobile = false;
    },

    hideNav: function (menu) {
        // fn hideNav
        var self = this;

        self.menus[self.visibleMenu].$menu.removeClass('is-active');
        self.menus[self.visibleMenu].$trigger.removeClass('is-active');
        self.visibleMenu = null;
    },
    showNav: function (menu) {
        // fn showNav 
        var self = this;

        if (self.visibleMenu !== null) {
            self.hideNav(self.visibleMenu);
        }

        self.menus[menu].$menu.addClass('is-active');
        self.menus[menu].$trigger.addClass('is-active');
        self.visibleMenu = menu;
    }
};