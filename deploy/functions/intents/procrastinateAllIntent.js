'use strict';
const {Intent} = require('./intent.js');
const {procrastinateApi} = require('../service/procrastinate.js');
/**
 * Handles exclusively the procrastination of all sub events.
 * This intent allows you to clear all subEvents for a given duration
 * **/
class ProcrastinateAllLookUpIntent extends Intent {
    /**
     * Constructor initializes all the elements for the class
     * @param {object!} app the app object for binding the intents
     **/
    constructor(app) {
        super({
            name: 'Procrastination All Intent',
        });
        this.handler_ = this.processIntent;
        app.intent(this.name, this.handler);
    }

    /**
     * Creates the necessary request to tiler api
     * and handles sending call backs to google actions api for intent
     * @param {object?} conv contains the conversation object from actions api
     * @param {object?} params holds an object which provides time span
     *  information for the blocking out of the schedule
     * @return {Promise!} returns of response back to google actions api.
     */
    processIntent(conv, {duration, timeLine}) {
        // let duration = params['duration'];
        // {duration, date-period}
        console.log('procrastination duration is');
        console.log(duration);
        console.log('procrastination timeline is ');
        console.log(JSON.stringify(timeLine));
        let retValue;

        if (duration) {
            retValue = procrastinateApi.procrastinateAllByDuration(duration);
        } else {
            retValue = procrastinateApi.procrastinateAllByTimeLine(timeLine);
        }

        retValue.then((response) => {
            conv.close(`Done clearing out some time.`);
        });

        return retValue;
    }
}

module.exports = ProcrastinateAllLookUpIntent;
