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
        this.start_ = start;
        this.end_ = end;
    }
}

module.exports = Timeline;
