'use strict';

const {constants} = require('../constants.js');
const {utility} = require('../utility.js');
const axios = require('axios').default;

let scheduleApi = {
    /**
     * Function retrieves the tiler schedule from the tiler server
     * @param {object?} startAndEndParams with start and end properties.
     * @return {object!} returns a promise of the rest request
     * If start isn't provided it defaults to 12:00 of current day
     * If end isn't provided it defaults to 12:00 of day after start
     * **/
    getSchedule: (startAndEndParams) => {
        let {start, end} = startAndEndParams || {};
        let credentials = utility.getUserCredentials();
        if (!start) {
            start = new Date();
            start.setHours(0, 0, 0, 0);
        }

        if (!end) {
            end = new Date(start);
            end.setDate(end.getDate() + 1);
            end.setHours(0, 0, 0, 0);
        }
        let urlPrefix = constants.api;

        let url = urlPrefix + 'Schedule';
        let timeZoneOffset = new Date().getTimezoneOffset();
        let postData = {
            UserName: credentials.UserName,
            UserID: credentials.ID,
            StartRange: start.getTime(),
            EndRange: end.getTime(),
            TimeZoneOffset: timeZoneOffset,
        };

        console.log('Making request to '+url);
        return axios.get(url,
            {
                params: postData,
            })
            .then((response) => {
                // handle success
                // console.log(response);
                return response.data;
            })
            .catch((error) => {
                // handle error
                console.log(error);
            });
    },
    /**
     * Function processes the response from the function 'getSchedule'
     * It returns just the subevents
     * @param {object?} response The json response from a tiler server
     * @return {Array} array of all sub events in the response
     * **/
    getSubEventsFromScheduleResponse: (response) => {
        let retValue = [];
        if (response && response.Error && response.Error.code === '0') {
            retValue = response.Content.Schedule.SubCalendarEvents;
        } else {
            throw Error('Issues with server response');
        }

        return retValue;
    },
};

module.exports = {scheduleApi};
