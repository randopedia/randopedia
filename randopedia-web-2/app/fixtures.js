// Fixtures for static data

import Texts from './texts';

class Fixtures {}

Fixtures.LanguageCodes = {
    ENG: "eng",
    NO: "no"
};

Fixtures.AreaTypes = {
    ROOT: 1,
    CONTINENT: 2,
    COUNTRY: 3,
    REGION: 4
};

Fixtures.TourStatus = {
    PUBLISHED: 1,
    DRAFT: 2,
    DELETED: 3,
    IN_REVIEW: 4,
    LAST_UPDATED: 5
};

Fixtures.MapSymbolTypes = {
    UP_DOWN_TRACK: 10,
    UP_TRACK: 11,
    DOWN_TRACK: 12,
    SUMMIT_POINT: 20,
};

Fixtures.MapObjectStyles = {
    DEFAULT_PATH_WIDTH: 4,
    SELECTED_PATH_WIDTH: 6,
    DEFAULT_PATH_COLOR: '#990000',
    UP_PATH_COLOR: '#343434',
    DOWN_PATH_COLOR: '#EE0000',
    SELECTED_PATH_COLOR: 'blue'
};

Fixtures.UndefinedString = "N/A",

Fixtures.TourActions = [
    {value: null, name: Fixtures.UndefinedString},
    {value: 1, name: 'Created'},
    {value: 2, name: 'Updated'},
    {value: 3, name: 'Deleted'},
    {value: 4, name: 'Image added'},
    {value: 5, name: 'Image updated'},
    {value: 6, name: 'Image deleted'},  
    {value: 7, name: 'Published'},  
    {value: 8, name: 'Restored' },
    {value: 9, name: 'Sent to review' }
];

Fixtures.Grades = [
    { value: null, name: Fixtures.UndefinedString},
    { value: 1, name: Texts.dictionary.grades_easy.eng, name_no: Texts.dictionary.grades_easy.no },
    { value: 2, name: Texts.dictionary.grades_fairlyDifficult.eng, name_no: Texts.dictionary.grades_fairlyDifficult.no },
    { value: 3, name: Texts.dictionary.grades_quiteDifficult.eng, name_no: Texts.dictionary.grades_quiteDifficult.no },
    { value: 4, name: Texts.dictionary.grades_difficult.eng, name_no: Texts.dictionary.grades_difficult.no },
    { value: 5, name: Texts.dictionary.grades_veryDifficult.eng, name_no: Texts.dictionary.grades_veryDifficult.no },
    { value: 6, name: Texts.dictionary.grades_extremlyDifficult.eng, name_no: Texts.dictionary.grades_extremlyDifficult.no }
];

Fixtures.Aspects = [
    {value: null, name: Fixtures.UndefinedString},
    {value: 1, name: 'N'},
    {value: 2, name: 'NW'},
    {value: 3, name: 'W'},
    {value: 4, name: 'SW'},
    {value: 5, name: 'S'},
    {value: 6, name: 'SE'},
    {value: 7, name: 'E'},
    {value: 8, name: 'NE'}
];

Fixtures.BooleanOptions = [
    {value: false, name: 'No', name_no: 'Nei' },
    {value: true, name: 'Yes', name_no: 'Ja' }
]; 

Fixtures.Months = [
    { value: null, name: Fixtures.UndefinedString },
    { value: 1, name: 'January', name_no: 'januar' },
    { value: 2, name: 'February', name_no: 'februar' },
    { value: 3, name: 'Mars', name_no: 'mars' },
    { value: 4, name: 'April', name_no: 'april' },
    { value: 5, name: 'May', name_no: 'mai' },
    { value: 6, name: 'June', name_no: 'juni' },
    { value: 7, name: 'July', name_no: 'juli' },
    { value: 8, name: 'August', name_no: 'august' },
    { value: 9, name: 'September', name_no: 'september' },
    { value: 10, name: 'October', name_no: 'oktober' },
    { value: 11, name: 'November', name_no: 'november' },
    { value: 12, name: 'December', name_no: 'desember' }
];

Fixtures.PathTypes = [
    { value: Fixtures.MapSymbolTypes.UP_DOWN_TRACK, name: 'Up/Down' },
    { value: Fixtures.MapSymbolTypes.UP_TRACK, name: 'Up' },
    { value: Fixtures.MapSymbolTypes.DOWN_TRACK, name: 'Down' }
];

Fixtures.Countries = [
    { value: null, name: "Other / Not set", name_no: "Annet / Ikke satt" },
    { value: "AND", name: "Andorra" },
    { value: "ARG", name: "Argentina" },
    { value: "AUS", name: "Australia" },
    { value: "AUT", name: "Austria" },
    { value: "BGR", name: "Bulgaria" },
    { value: "CAN", name: "Canada" }, 
    { value: "CHL", name: "Chili" },
    { value: "FIN", name: "Finland" },
    { value: "FRA", name: "France" },
    { value: "GEO", name: "Georgia" },
    { value: "DEU", name: "Germany" },
    { value: "GRL", name: "Greenland" },
    { value: "ISL", name: "Iceland" },
    { value: "ITA", name: "Italy" },
    { value: "IRN", name: "Iran" },
    { value: "LIE", name: "Liechtenstein" },
    { value: "MAR", name: "Morocco" },
    { value: "NZL", name: "New Zealand" },
    { value: "NOR", name: "Norway" },
    { value: "POL", name: "Poland" },
    { value: "RUS", name: "Russia" },
    { value: "SVN", name: "Slovenia" },
    { value: "ESP", name: "Spain" },
    { value: "SWE", name: "Sweden" },
    { value: "CHE", name: "Switzerland" },
    { value: "USA", name: "USA" }
];

export default Fixtures;
