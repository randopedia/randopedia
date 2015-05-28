var enums = (function () {

    var TourStatus = {
        PUBLISHED:  1,
        DRAFT:      2,
        DELETED:    3,
        IN_REVIEW:  4
    };

    return {
        TourStatus: TourStatus,
    };
    
})();

module.exports = enums;