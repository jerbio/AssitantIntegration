const Timeline = require('../models/timeline.js');
const conversationUtility = require('./conversationUtility');
const moment = require('moment');
let scheduleConversation = {
    processSubEvents: ({subEvents}) => {
        let retValue = 'There are no events or tiles on your schedule';
        if (subEvents && Array.isArray(subEvents) && subEvents.length > 0) {
            retValue = `There are ${subEvents.length} events `+
                        `or tiles on your schedule`;
        }
        return retValue;
    },

    subEventName({
        subEvent,
        includeDay = true,
        includeStartTime,
        includeEndTime}) {
        let retValue = '';
        retValue+=subEvent.SubCalCalendarName || 'busy';
        let startString = moment(subEvent.SubCalStartDate).format('hh:MM a');
        let endString = moment(subEvent.SubCalCalEventEnd).format('hh:MM a');
        if (includeStartTime && includeEndTime) {
            retValue+=' from ';
            retValue+=startString;
            retValue+=' to ';
            retValue+=endString;
        } else if (includeStartTime) {
            retValue+=' at ';
            retValue+=startString;
        } else if (includeEndTime) {
            retValue+=' by ';
            retValue+=endString;
        }
        return retValue;
    },

    concatenateNames({subEvents,
        includeStartTime,
        includeEndTime}) {
        let retValue = '';
        let isAndable = subEvents.length > 1;
        let lastSubEvent = subEvents[subEvents.length - 1];
        if (isAndable) {
            retValue+=' ';
            let excludingLastSubEvent = subEvents
                .slice(0, subEvents.length - 1);
            excludingLastSubEvent
                .forEach((eachSubEvent) => {
                    let subEventString = scheduleConversation
                        .subEventName({subEvent: eachSubEvent,
                            includeStartTime,
                            includeEndTime});
                    retValue += '<s>'+subEventString + '</s>';
                    retValue += ', ';
            });
            retValue += ' and ';
        }
        let lastString = scheduleConversation.subEventName({
            subEvent: lastSubEvent,
            includeStartTime,
            includeEndTime});
        retValue += '<s>'+lastString+'</s>';
        return retValue;
    },

    moreSubEventProcessing: ((subEvents) => {
        let nowSubevents = [];
        let subsequentSubEvents = [];
        let precedingSubEvents = [];
        let allDaySubevents = [];
        let nowInMs = Date.now();
        subEvents.forEach((eachSubEvent) => {
            let timeline = new Timeline(
                eachSubEvent.SubCalStartDate,
                eachSubEvent.SubCalEndDate);

            if (timeline.isTimeWithin(nowInMs)) {
                if (eachSubEvent.isAllDay) {
                    allDaySubevents.push(eachSubEvent);
                } else {
                    nowSubevents.push(eachSubEvent);
                }
            } else {
                if (timeline.start > nowInMs) {
                    subsequentSubEvents.push(eachSubEvent);
                } else {
                    precedingSubEvents.push(eachSubEvent);
                }
            }
        });
        let concatStrings = [];
        let retValue = '';
        if (nowSubevents.length > 0) {
            let nowStatementString = '';
            if (nowSubevents.length > 1) {
                nowStatementString = `There are ${nowSubevents.length}`+
                    ` conflicting events `+
                    `right now.`;
            }
            nowStatementString+='<p>You should be doing this now: ';
            let currentSubEventString = scheduleConversation.concatenateNames(
                    {subEvents: nowSubevents}
                );
            nowStatementString +='<s>'+currentSubEventString+'</s>';
            nowStatementString+='</p>';
            concatStrings.push(nowStatementString);
        }

        if (subsequentSubEvents.length > 0) {
            let subSequentStatementString = '<p>Later in the day you have '+
                'the following:';
            let subsequentSubEventString = scheduleConversation.
                concatenateNames({subEvents: subsequentSubEvents});

            subSequentStatementString += subsequentSubEventString;
            subSequentStatementString+='</p>';
            concatStrings.push(subSequentStatementString);
        }
        retValue = conversationUtility.concatString(
            {stringCollection: concatStrings}
        );
        retValue ='<speak>'+retValue+'</speak>';
        return retValue;
    }),
};

module.exports = {scheduleConversation};
