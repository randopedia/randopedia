var texts = {};

texts.get = function (identifier) {

    if (!texts.dictionary[identifier]) {
        console.log("Couldn't resolve text " + identifier);
        return "";
    }

    if (App.language === "no") {
        if (!texts.dictionary[identifier].no) {
            console.log("Couldn't resolve norwegian text for " + identifier);
            return "";
        }
        return texts.dictionary[identifier].no;

    } else {
        if (!texts.dictionary[identifier].eng) {
            console.log("Couldn't resolve english text for " + identifier);
            return "";
        }
        return texts.dictionary[identifier].eng;
    }
};

texts.dictionary = {
    header_about: {
        no: "Om",
        eng: "About"
    },
    header_addNewTour: {
        no: "Legg til ny tur",
        eng: "Add new tour"
    },
    header_map: {
        no: "Kart",
        eng: "Map"
    },
    header_dashboard: {
        no: "Dashboard",
        eng: "Dashboard"
    },
    header_help: {
        no: "Hjelp",
        eng: "Help"
    },
    header_language: {
        no: "Språk",
        eng: "Language"
    },
    header_logout: {
        no: "Logge ut",
        eng: "Logout"
    },
    header_loggedInAs: {
        no: "Logget inn som",
        eng: "Logged in as"
    },
    header_login: {
        no: "Logge inn",
        eng: "Login"
    },
    header_tours: {
        no: "Turer",
        eng: "Tours"
    },
    header_myTours: {
        no: "Mine turer",
        eng: "My tours"
    },
    header_toursInReview: {
        no: "Turer i review",
        eng: "Tours in review"
    },
    tour_accessPoint: {
        no: "Start",
        eng: "Access point"
    },
    tour_aspect: {
        no: "Aspekt",
        eng: "Aspect"
    },
    tour_description: {
        no: "Beskrivelse",
        eng: "Description"
    },
    tour_discussionsAndTripReports: {
        no: "Diskussioner och turrapporter",
        eng: "Discussions and trip reports"
    },
    tour_editTour: {
        no: "Endre tur",
        eng: "Edit tour"
    },
    tour_elevation: {
        no: "Høyde",
        eng: "Elevation"
    },
    tour_grade: {
        no: "Grad",
        eng: "Grade"
    },
    tour_hazards: {
        no: "Farer",
        eng: "Hazards"
    },
    tour_images: {
        no: "Bilder",
        eng: "Images"
    },
    tour_instagreamFeed: {
        no: "Instagramstrømme",
        eng: "Instagram feed"
    },
    tour_mountaineering: {
        no: "Mountaineering",
        eng: "Mountaineering"
    },
    tour_season: {
        no: "Sesong",
        eng: "Season"
    },
    tour_steepness: {
        no: "Bratthet",
        eng: "Steepness"
    },
    tour_tags: {
        no: "Tags",
        eng: "Tags"
    },
    tour_time: {
        no: "Tid",
        eng: "Time"
    },
    tour_viewTourOnMap: {
        no: "Vis på kart",
        eng: "View tour on map"
    },
    tourEdit_currentLanguageVersion: {
        no: "Norsk version",
        eng: "English version"
    },
    tourEdit_country: {
        no: "Land",
        eng: "Country"
    },
    tourEdit_details: {
        no: "Detaljer",
        eng: "Details"
    },
    tourEdit_exit: {
        no: "Avslutt editering",
        eng: "Exit edit"
    },
    tourEdit_elevationGain: {
        no: "Elevation gain",
        eng: "Elevation gain"
    },
    tourEdit_elevationLoss: {
        no: "Elevation loss",
        eng: "Elevation loss"
    },
    tourEdit_highestPoint: {
        no: "Høyeste punkt",
        eng: "Highest point"
    },
    tourEdit_history: {
        no: "Historik",
        eng: "History"
    },
    tour_instagramFeed: {
        no: "Instagram",
        eng: "Instagram feed"
    },
    tourEdit_publish: {
        no: "Publiser",
        eng: "Publish"
    },
    tourEdit_seasonFrom: {
        no: "Sesong fra",
        eng: "Season from"
    },
    tourEdit_seasonTo: {
        no: "Sesong til",
        eng: "Season to"
    },
    tourEdit_steepnessMax: {
        no: "Bratthet, maks",
        eng: "Steepness, max"
    },
    tourEdit_mainAspect: {
        no: "Hovudsaklig ",
        eng: "Main aspect of slopes"
    },
    tourEdit_map: {
        no: "Kart",
        eng: "Map"
    },
    tourEdit_mountaineering: {
        no: "Mountaineering skills/equipment",
        eng: "Mountaineering skills/equipment"
    },
    tourEdit_nameOfTour: {
        no: "Navn på tur",
        eng: "Name of tour"
    },
    tourEdit_sendToReview: {
        no: "Send til review",
        eng: "Send to review"
    },
    tourEdit_saveAsDraft: {
        no: "Lagre som draft",
        eng: "Save as draft"
    },
    tourEdit_saving: {
        no: "Lagrer",
        eng: "Saving"
    },
    tourEdit_summary: {
        no: "Tursammendrag",
        eng: "Tour summary"
    },
    tourEdit_timeMin: {
        no: "Tid, min",
        eng: "Time, min"
    },
    tourEdit_timeMax: {
        no: "Tid, maks",
        eng: "Time, max"
    },
    tourEdit_unsavedChanges: {
        no: "Turen har endringer som ikke er lagret",
        eng: "Tour has unsaved changes"
    },
};