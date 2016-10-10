import App from 'ember';

const texts = {};

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
    common_siteSlogan: {
        no: "Topptursdatabasen",
        eng: "The ski tour database"
    },
    dashboard_onInstagram: {
        no: "på Instagram",
        eng: "on Instagram"
    },
    dashboard_lastUpdatedTours: {
        no: "Siste oppdaterte turer",
        eng: "Last updated tours"
    }, 
    // TODO: Create function that can resolve correct langauage string supporting any number of parameters such like getString("dashboard_funfact", param1, param2, param3)
    dashboard_funfact1: {
        no: "Randopedia-databasen inneholder for tiden beskrivelser for",
        eng: "The randopedia database currently contains descriptions for"
    },
    dashboard_funfact2: {
        no: "alpine toppturer. Til sammen",
        eng: "ski tours. That's"
    },
    dashboard_funfact3: {
        no: "høydemeter med koselig klatring og",
        eng: "meters of leg warming climbs and"
    },
    dashboard_funfact4: {
        no: "høydemeter med rå skikjøring.",
        eng: "meters of awesome skiing."
    },
    error_getLocation: {
        no: "Couldn't resolve position, is location service enabled on your device?",
        eng: "Couldn't resolve position, is location service enabled on your device?"
    },
    grades_header: {
        no: "Vanskelighetsgrader",
        eng: "Grades"
    },
    grades_easy: {
        no: "Lett",
        eng: "Easy"
    },
    grades_fairlyDifficult: {
        no: "Litt vanskelig",
        eng: "Fairly difficult"
    },
    grades_quiteDifficult: {
        no: "Ganske vanskelig",
        eng: "Quite difficult"
    },
    grades_difficult: {
        no: "Vanskelig",
        eng: "Difficult"
    },
    grades_veryDifficult: {
        no: "Veldig vanskelig",
        eng: "Very difficult"
    },
    grades_extremlyDifficult: {
        no: "Ekstremt vanskelig",
        eng: "Extremly difficult"
    },
    header_about: {
        no: "Om",
        eng: "About"
    },
    header_addNewTour: {
        no: "Legg til ny tur",
        eng: "Add new tour"
    },
    header_addTour: {
        no: "Legg til tur",
        eng: "Add tour"
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
        no: "Logg ut",
        eng: "Logout"
    },
    header_loggedInAs: {
        no: "Logget inn som",
        eng: "Logged in as"
    },
    header_login: {
        no: "Logg inn",
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
    login_loginWith: {
        no: "Logg inn med",
        eng: "Login with"
    },
    login_modalText: {
        no: "Logg inn for å legge til eller oppdatere turer.",
        eng: "Please login to add or update tours."
    },
    login_Login: {
        no: "Logg inn",
        eng: "Login"
    },
    map_hideOtherTours: {
        no: "Skjul andre turer",
        eng: "Hide other tour paths"
    },
    map_loading: {
        no: "Laster kart",
        eng: "Loading map"
    },
    map_myPosition: {
        no: "Min posisjon",
        eng: "My position"
    },
    map_viewTourDetails: {
        no: "Vis turdetaljer",
        eng: "View tour details"
    },
    map_waitingForPosition: {
        no: "Venter på posisjon",
        eng: "Waiting for position"
    },
    map_zoomInOnMap: {
        no: "Zoom inn på kart",
        eng: "Zoom in on map"
    },
    map_up: {
        no: "Opp",
        eng: "Up"
    },
    map_down: {
        no: "Ned",
        eng: "Down"
    },
    map_upDown: {
        no: "Opp/Ned",
        eng: "Up/Down"
    },
    map_summitPoint: {
        no: "Topp-punkt",
        eng: "Summit point"
    },
    map_editPaths: {
        no: "Endre ruter",
        eng: "Edit paths"
    },
    map_addPath: {
        no: "Legg til rute",
        eng: "Add path"
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
        no: "Diskusjoner og turrapporter",
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
        no: "Denne tur er markert som ikke ferdig, så noen viktig informasjon kan mangle",
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
    tour_tourIsDraft: {
        no: "Utkast, turen er ikke publisert",
        eng: "This is a draft, the tour has not yet been published."
    },
    tour_viewTourOnMap: {
        no: "Vis på kart",
        eng: "View on map"
    },
    tourEdit_currentLanguageVersion: {
        no: "Norsk versjon",
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
        no: "Høydemeter opp",
        eng: "Elevation gain"
    },
    tourEdit_elevationLoss: {
        no: "Høydemeter ned",
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
        no: "Helning, maks",
        eng: "Steepness, max"
    },
    tourEdit_mainAspect: {
        no: "Hovedsaklig aspekt",
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

export default texts;