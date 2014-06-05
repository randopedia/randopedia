//App.rootElement = '#root-element';

App.setupForTesting();
App.injectTestHelpers();

//Run after each test case.
QUnit.testDone(function () {
    Ember.testing = false;
    App.reset();
});

function checkHeaderAndFooter() {
	ok(find(".header-box").length, "The header was not rendered");
	ok(find(".footer-box").length, "The footer was not rendered");
	ok(find(".search-textfield").length, "Search box was not rendered");
    //ok(find("a:contains('Browse')").length, "Browse link not showing");
    ok(find("a:contains('Login')").length, "Login link not showing");
};

function exists(selector) {
    return !!find(selector).length;
}

module("Site basics", {
    setup: function () {
        App.reset();
        Ember.run(App, App.advanceReadiness);
    },
    teardown: function () {
        App.reset();
    }
});

test("Check front page basics", function () {
    visit("/").then(function () {
    	checkHeaderAndFooter();
        ok(find("h5:contains('Randopedia - the ski tour encyclopedia')").length, "Welcome text not showing");
    });
});

test("Check About basics", function () {
    visit("/about").then(function () {
    	checkHeaderAndFooter();
    	ok(find("h3:contains('About Randopedia')").length, "About page not showing")
    });
});

// TODO: Why does this test fail?
//test("Check Browse basics", function () {
//    visit("/browse").then(function () {
//    	checkHeaderAndFooter();
//    	ok(find("h3:contains('Browse by location')").length, "Browse page not showing")
//    	ok(find("ul.areas").length, "Area list not rendered")
//    });
//});