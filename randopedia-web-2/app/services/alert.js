import Service from '@ember/service';

export default Service.extend({

    showMessage: function (message, type, delayParam) {
        $.bootstrapGrowl(message, {
            ele: 'body',
            type: type,
            offset: { from: "top", amount: 70 },
            align: "right",
            allow_dismiss: true,
            delay: delayParam !== undefined && delayParam !== null ? delayParam : 4000,
            width: 'auto'
        });
    },
        
    showSuccessMessage: function (message, delayParam) {
        this.showMessage(message, "success", delayParam);
    },
    
    showErrorMessage: function (message) {
        this.showMessage(message, "danger", 0);
    },

    long_delay : 7000
});
