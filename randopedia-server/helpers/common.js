  var common = (function () {

    function getTextId(textId) {
        textId = textId.replace('ø', 'o');
        textId = textId.replace('æ', 'a');
        textId = textId.replace('Ø', 'O');
        textId = textId.replace('Æ', 'A');
        textId = textId.replace('å', 'a');
        textId = textId.replace('ä', 'a');
        textId = textId.replace('ö', 'o');
        textId = textId.replace('Å', 'a');
        textId = textId.replace('Ä', 'a');
        textId = textId.replace('Ö', 'o');
        textId = textId.replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        textId = textId.replaceAll("[^a-zA-Z0-9]", "_");
        return textId.toLowerCase();
    }
    
    return {
        getTextId: getTextId
    };
    
})();

module.exports = common;