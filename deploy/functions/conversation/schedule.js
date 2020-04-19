let scheduleConversation = {
    processSubEvents: ({subEvents}) => {
        let retValue = 'There are no events or tiles on your schedule';
        if (subEvents && Array.isArray(subEvents) && subEvents.length > 0) {
            retValue = `There are ${subEvents.length} events `+
                        `or tiles on your schedule`;
        }
        return retValue;
    },
};

module.exports = {scheduleConversation};
