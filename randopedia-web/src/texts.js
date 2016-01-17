﻿var texts = {};

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
    grades_easy: {
        no: "Lett",
        eng: "Easy"
    },
    grades_fairlyDifficult: {
        no: "Fairly difficult",
        eng: "Fairly difficult"
    },
    grades_quiteDifficult: {
        no: "Quite difficult",
        eng: "Quite difficult"
    },
    grades_difficult: {
        no: "Quite difficult",
        eng: "Difficult"
    },
    grades_veryDifficult: {
        no: "Very difficult",
        eng: "Very difficult"
    },
    header_extremlyDifficult: {
        no: "Extremly difficult",
        eng: "Extremly difficult"
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
        no: "Turer under vurdering",
        eng: "Tours in review"
    },
    map_hideOtherTours: {
        no: "Skjul andre turer",
        eng: "Hide other tour paths"
    },
    map_viewTourDetails: {
        no: "Vis turdetaljer",
        eng: "View tour details"
    },
    map_zoomInOnMap: {
        no: "Zoom inn på kart",
        eng: "Zoom in on map"
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
    tour_instagramFeed: {
        no: "Instagram",
        eng: "Instagram feed"
    },
    tour_markedAsIncomplete: {
        no: "Denne tur er markert som ikke ferdig, så noen viktig information kan savnes",
        eng: "This tour is marked as incomplete so it might lack some important information"
    },
    tour_mountaineering: {
        no: "Klatremoment",
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
        no: "Historikk",
        eng: "History"
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
        no: "Klatreferdigheter/utstyr",
        eng: "Mountaineering skills/equipment"
    },
    tourEdit_nameOfTour: {
        no: "Navn på tur",
        eng: "Name of tour"
    },
    tourEdit_recommendedFieldInfo: {
        no: "Anbefalt felt (turen blir markert som ikke ferdig hvis ikke satt)",
        eng: "Recommended field (tour will be marked as incomplete if not set)"
    },
    tourEdit_requiredFieldInfo: {
        no: "Obligatorisk felt (turen kan ikke bli publisert hvis ikke satt)",
        eng: "Required field (tour cannot be published if not set)"
    },
    tourEdit_sendToReview: {
        no: "Send til vurdering",
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
    }
};