
let utility = {
    /**
     * Function returns the current logged in user credentials
     * @return {object?} usercredentials or null if no user detected
     * **/
    getUserCredentials: () => {
        return {
            UserName: 'jerbio',
            ID: '6bc6992f-3222-4fd8-9e2b-b94eba2fb717',
            Name: '',
        };
    },
    /**
     * Function gets the date of the current weekend.
     * If the current Day is saturday or sunday
     * it return 12 midnight of the current day.
     * Ekse it returns the 12 midnight of the next coming saturday
     * @return {object!}
     * **/
    getWeekendDate: () => {
        let retValue = new Date();
        let currentDay = retValue.getDay();
        if (currentDay == 6 || currentDay == 0) {
            retValue.setHours(0, 0, 0, 0);
        } else {
            let dayDelta = (6 - currentDay);
            let newDayDate = retValue.getDate() + dayDelta;
            retValue.setDate(newDayDate);
        }
        return retValue;
    },
};

module.exports = {utility};
