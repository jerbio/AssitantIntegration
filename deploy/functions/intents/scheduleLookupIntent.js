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
     * @param {object!} app the app object for binding the intents
     **/
    constructor(app) {
        super({
            name: 'Lookup schedule intent',
        });
        this.handler_ = this.processIntent;
        app.intent(this.name, this.handler);
        this.yeaName_ = 'Lookup schedule intent - yes';
        this.nayName_ = 'Lookup schedule intent - no';
        app.intent(this.nayName, this.nayIntent);
        app.intent(this.yeaName, this.yeaIntent);
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
                conv.ask(`Hey ${conv.data.userName}, Here is your update, ` +
                    `${conversation}. 
                    Do you want more details on the sub events?`);
            } else {
                conv.ask(`Here is your update, ` +
                `${conversation}. Wanna know more?`);
            }
        });

        return retValue;
    }

    /**
     * Function handles no response to a schedule lookup
     * @param {object!} conv conversation object for sending response
     * to google servers
     * @param {object!} param1 hold the user generated inputs
     */
    nayIntent(conv, {scheduleTime}) {
        if (conv.data.userName) {
        // If we collected user name previously,
        // address them by name and use SSML
        // to embed an audio snippet in the response.
            conv.close(`Goodbye ${conv.data.userName}`);
        } else {
            conv.close(`Goodbye`);
        }
    }


    /**
     * Function handles yes response to a schedule lookup
     * @param {object!} conv conversation object for sending response
     * to google servers
     * @param {object!} param1 hold the user generated inputs
     * @return {object!} promise for handling async processing of request
     */
    yeaIntent(conv, {scheduleTime}) {
        console.log('WAS there a response may be ');
        console.log(JSON.stringify(scheduleTime));
        let retValue = scheduleApi.getSchedule(scheduleTime);
        retValue.then((response) => {
            // let subEvents = scheduleApi.
            //     getSubEventsFromScheduleResponse(response);
            // console.log(subEvents);

            if (conv.data.userName) {
            // If we collected user name previously,
            // address them by name and use SSML
            // to embed an audio snippet in the response.
                conv.close(`Goodbye ${conv.data.userName}`);
            } else {
                console.log('WAS there a response may be ');
                console.log(JSON.stringify(scheduleTime));
                conv.close(`Goodbye`);
            }
        });

        return retValue;
    }
}

module.exports = ScheduleLookUpIntent;
