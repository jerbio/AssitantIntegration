const {constants} = require('./constants.js');
const axios = require('axios').default;

let scheduleApi = {
    getSchedule: ({start, end}) => {
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

        let myurl = urlPrefix + 'Schedule';
        let timeZoneOffset = new Date().getTimezoneOffset();
        let postData = {
            UserName: credentials.UserName,
            UserID: credentials.ID,
            StartRange: start.getTime(),
            EndRange: end.getTime(),
            TimeZoneOffset: timeZoneOffset,
        };

        return axios.get(myurl,
            {
                params: postData,
            })
        .then((response) => {
            // handle success
            console.log(response);
        })
        .catch((error) => {
            // handle error
            console.log(error);
        });
    },
};

module.exports = {scheduleApi};
