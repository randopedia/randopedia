var LocationHelper = {
    removeAndRedirectPageIfUrlContainsHashbang: function () {
        var url = document.location.toString();
        var hashbangIndex = url.indexOf('/#!');
        if (hashbangIndex !== -1) {
            var firstPart = url.slice(0, hashbangIndex);
            var secondPart = "";
            if (url.length > hashbangIndex + 3) {
                secondPart = url.slice(hashbangIndex + 3);
            }
            window.location = firstPart + secondPart;
            return true;
        }
        return false;
    },

    resolveLanguageCodeFromLocation: function () {
        var pathname = window.location.pathname;
        if (pathname.indexOf("/no", 0) === 0) {
            return "no";
        }
        return "";
    },

    setPathnameWithLanguageCode: function (code) {
        if (!code) { code = ""; }
        var pathname = window.location.pathname;
        var index = pathname.indexOf("/no", 0);

        if (index === 0 && code === "") { // NORWEGIAN TO ENGLISH
            return pathname.slice(index + 3);

        } else if (index === 0) { // NORWEGIAN TO NORWEGIAN
            return "/no" + pathname.slice(index + 3);
        }

        if (code === "no") { // ENGLISH TO NORWEGIAN 
            return "/no" + pathname;
        }

        if (code === "") { // ENGLISH TO ENGLISH
            return pathname;
        }

        return "";
    },

    redirectToPathname: function (pathname) {
        window.location = "http://" + window.location.host + pathname;
    }
};