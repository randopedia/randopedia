import toGeoJSON from 'togeojson';

export const validateGeoJson = (geojson) => {
    if(!geojson) {
        return false;
    }
    if(!geojson.features || geojson.features.length === 0) {
        return false;
    }
    if (!geojson.features[0].geometry || geojson.features[0].geometry.length === 0) {
        return false;
    }
    return true;
};

export const getGeoJSONFromReader = (reader) => {
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(reader.result, "application/xml");
    var geojson = toGeoJSON.gpx(xmlDoc);
    return geojson;
}
