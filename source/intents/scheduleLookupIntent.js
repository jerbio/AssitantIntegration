'use strict';
const {Intent} = require('./intent.js');
const {scheduleApi} = require('../service/schedule.js');
const {scheduleConversation} = require('../conversation/schedule.js');
/**
 * Handles exclusively the look up intent.
 * This intent allows you to get the subevents in the schedule
 * **/
class ScheduleLookUpIntent extends Intent {
    /**
     * Constructor initializes all the elements for the class
     **/
    constructor() {
        super({
            name: 'Lookup schedule intent',
        });
        this.handler_ = this.processIntent;
    }

    /**
     * Creates the necessary request to tiler api
     * and handles sending call backs to google actions api for intent
     * @param {object?} conv contains the conversation object from actions api
     * @param {object?} param1 holds an object which provides timing information
     * for the lookup scheduleTime can either contains
     * just a startTime propoerty or both startTime and endTIme
     * @return {Promise!} returns of response back to google actions api.
     */
    processIntent(conv, {scheduleTime}) {
        let retValue = scheduleApi.getSchedule(scheduleTime);
        retValue.then((response) => {
            let subEvents = scheduleApi.
                getSubEventsFromScheduleResponse(response);
            let conversation = scheduleConversation.
                processSubEvents({subEvents});

            if (conv.data.userName) {
            // If we collected user name previously,
            // address them by name and use SSML
            // to embed an audio snippet in the response.
            conv.close(`Hey ${conv.data.userName}, Here is your update, ` +
                `${conversation}. Wanna know more?`);
            } else {
                conv.close(`We out son`);
            }
        });

        return retValue;
    }
}

module.exports = ScheduleLookUpIntent;
