var enums = (function () {

    var TourStatus = {
        PUBLISHED:  1,
        DRAFT:      2,
        DELETED:    3,
        IN_REVIEW:  4
    };
    
    var TourActionType = {
     	CREATE:         1,
        UPDATE:         2,
        DELETE:         3,
        IMAGE_CREATE:   4,
        IMAGE_UPDATE:   5, 
        IMAGE_DELETE:   6,
        PUBLISH:        7,
        RESTORE:        8,
        SENT_TO_REVIEW: 9   
    };

    return {
        TourStatus: TourStatus,
        TourActionType: TourActionType
    };
    
})();

module.exports = enums;