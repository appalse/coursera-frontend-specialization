module.exports = {
    subscriptions: {},

    /**
     * @param {String} event
     * @param {Object} subscriber
     * @param {Function} handler
     */
    on: function (event, subscriber, handler) {
        if (!this.subscriptions.hasOwnProperty(event)) {
            this.subscriptions[event] = new Set();
        };
        this.subscriptions[event].add({ subscriber: subscriber, 
                                        handler:    handler});
        return this;
    },

    /**
     * @param {String} event
     * @param {Object} subscriber
     */
    off: function (event, subscriber) {
        if (this.subscriptions.hasOwnProperty(event)) {
            this.subscriptions[event].forEach(function(subscription) {
                if (subscription.subscriber === subscriber) {
                    this.subscriptions[event].delete(subscription);
                }
            }, this);
        };
        return this;
    },

    /**
     * @param {String} event
     */
    emit: function (event) {
        if (!this.subscriptions.hasOwnProperty(event)) {
            return this;
        }
        this.subscriptions[event].forEach(function(subscription){
            subscription.handler.call(subscription.subscriber);
        });
        return this;
    }
};
