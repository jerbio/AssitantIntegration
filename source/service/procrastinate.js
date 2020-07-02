'use strict';

const {constants} = require('../constants.js');
const {utility} = require('../utility.js');
const axios = require('axios').default;

let procrastinateApi = {
    /**
     * Function retrieves the tiler schedule from the tiler server
     * @param {object?} timeSpanInfo either a sys.duration or sys.date-period.
     * @return {object!} returns a promise of the rest request
     * If start isn't provided it defaults to 12:00 of current day
     * If end isn't provided it defaults to 12:00 of day after start
     * **/
    procrastinateAllByDuration: (timeSpanInfo) => {
        let durationData = procrastinateApi.getDuration(timeSpanInfo);
        let credentials = utility.getUserCredentials();
        let urlPrefix = constants.api;

        let url = urlPrefix + 'Schedule/ProcrastinateAll';
        let timeZoneOffset = new Date().getTimezoneOffset();

        let postData = durationData;
        postData ['UserName'] = credentials.UserName;
        postData ['UserID'] = credentials.ID;
        postData ['TimeZoneOffset'] = timeZoneOffset;
        console.log('Making procrastinate all request to '+url);
        return axios.post(url, postData)
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
    procrastinateAllByTimeLine: (timeLineInfo) => {
        let timeData = procrastinateApi.getTimeLine(timeLineInfo);
        let credentials = utility.getUserCredentials();
        let urlPrefix = constants.api;

        let url = urlPrefix + 'Schedule/ProcrastinateAll';
        let timeZoneOffset = new Date().getTimezoneOffset();

        let postData = timeData;
        postData['UserName'] = credentials.UserName;
        postData['UserID']= credentials.ID;
        postData['TimeZoneOffset'] = timeZoneOffset;
        console.log('Making procrastinate all request to '+url);
        return axios.post(url, postData)
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
     * Funcion takes a google action sys.duration and converts it
     * to milliseconds.
     * @param {object} timeSpanInfo either a sys.duration or sys.date-period.
     * @return {long!} returns a the duration in milliseconds
     */
    getDuration(timeSpanInfo) {
        let hour = 0;
        let min = 0;
        let days = 0;
        let seconds = 0;

        if (timeSpanInfo) {
            if (timeSpanInfo['unit'] && timeSpanInfo['unit'] =='h') {
                hour = timeSpanInfo['amount'];
            }

            if (timeSpanInfo['unit'] && timeSpanInfo['unit'] =='min') {
                min = timeSpanInfo['amount'];
            }

            if (timeSpanInfo['unit'] && timeSpanInfo['unit'] =='day') {
                days = timeSpanInfo['amount'];
            }

            if (timeSpanInfo['unit'] && timeSpanInfo['unit'] =='s') {
                seconds = timeSpanInfo['amount'];
            }
        }

        let durationInMs = (hour * constants.oneHourInMs) +
            (min * constants.oneMinunteInMs) +
            (days * constants.oneDayInMs) +
            (seconds * constants.oneSecondInMs);

        let retValue = {
            'DurationInMs': durationInMs,
        };

        return retValue;
    },

    /**
     * Funcion takes a google action sys.date-period and converts it
     * to a timeline of start and end to be used by tiler servers.
     * @param {object} timeLineInfo either a sys.duration or sys.date-period.
     * @return {long!} returns a the duration in milliseconds
     */
    getTimeLine(timeLineInfo) {
        let retValue = null;
        if (timeLineInfo) {
            let startString = timeLineInfo['startDate'];
            let endString = timeLineInfo['endDate'];

            let startAsMs = Date.parse(startString);
            let endAsMs = Date.parse(endString);

            retValue = {
                StartInMs: startAsMs,
                EndInMs: endAsMs,
            };
        }

        return retValue;
    },
};

module.exports = {procrastinateApi};
