'use strict';
const {utility} = require('../utility.js');
/**
 * Class represents a timeline object which has a start and an end
 */
class Timeline {
    /**
     * Initializes the class
     * @param {Number} start or Date object for the start of the timeline
     * @param {Number} end or Date object for the end of the timeline
     * if end is earlier than beginning an error is thrown
     */
    constructor(start, end) {
        if (start instanceof Date) {
            this.start_ = start.getTime();
        } else if (utility.isNumber(start)) {
            this.start_ = start;
        } else {
            throw Error('start has to be a number or Date object');
        }

        if (end instanceof Date) {
            this.end_ = end.getTime();
        } else if (utility.isNumber(end)) {
            this.end_ = end;
        } else {
            throw Error('end has to be a number or Date object');
        }
    }

    /**
     * getter function returns the start time as epcoch unix time number
     * @return {Number!} returns a number as date
     */
    get start() {
        return this.start_;
    }

    /**
     * getter function returns the end time as epcoch unix time number
     * @return {Number!} returns a number as date
     */
    get end() {
        return this.end_;
    }

    /**
     * Function returns true if the provided time is within this timeline
     * @param {Date!} time in which you need to check if is within timeline
     * @return {Boolean} if time is within timeline
     */
    isTimeWithin(time) {
        let timeAsMs = time;
        if (timeAsMs instanceof Date) {
            timeAsMs = time.getTime();
        } else if (!utility.isNumber(timeAsMs)) {
            let msg = 'start has to be a number or Date object';
            console.error(msg);
            throw Error(msg);
        }

        let retValue = this.start <= timeAsMs && timeAsMs < this.end;
        return retValue;
    }

    /**
     * Returns true if timeline conflicts and false it it doesnt
     * @param {Timeline!} timeline
     * @return {boolean}
     */
    doesTimelineInterfere(timeline) {
        if (!utility.isUndefinedOrNull(timeline)) {
            let retValue = this.end > timeline.start &&
                this.start < timeline.end;
            return retValue;
        }

        throw Error('timeline is not a Timeline object');
    }
}

module.exports = Timeline;
