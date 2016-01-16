var texts = {};

texts.get = function (identifier) {
    console.log("get: " + identifier);

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
    accessPoint: {
        no: "Start",
        eng: "Access point"
    },
    aspect: {
        no: "Aspekt",
        eng: "Aspect"
    },
    description: {
        no: "Beskrivelse",
        eng: "Description"
    },
    discussionsAndTripReports: {
        no: "Diskussioner och turrapporter",
        eng: "Discussions and trip reports"
    },
    editTour: {
        no: "Endre tur",
        eng: "Edit tour"
    },
    elevation: {
        no: "Høyde",
        eng: "Elevation"
    },
    grade: {
        no: "Grad",
        eng: "Grade"
    },
    hazards: {
        no: "Farer",
        eng: "Hazards"
    },
    images: {
        no: "Bilder",
        eng: "Images"
    },
    instagreamFeed: {
        no: "Instagramstrømme",
        eng: "Instagram feed"
    },
    mountaineering: {
        no: "Mountaineering",
        eng: "Mountaineering"
    },
    season: {
        no: "Årstid",
        eng: "Season"
    },
    steepness: {
        no: "Bratthet",
        eng: "Steepness"
    },
    tags: {
        no: "Tags",
        eng: "Tags"
    },
    time: {
        no: "Tid",
        eng: "Time"
    },
    viewTourOnMap: {
        no: "Vis på kart",
        eng: "View tour on map"
    },
};