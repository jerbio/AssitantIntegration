'use strict';
const {
    dialogflow,
  } = require('actions-on-google');

const app = dialogflow({debug: true});


// Other necessary intents
// CreationIntent, CompletionIntent, DeletionIntent, SetAsNowIntent,
// ScheduleHealthIntent, EventLookupIntent, ProcrastinationIntent, WhatIfIntent


/**
 * Parent class for all intents.
 * Handles the base class initialization
 * It does not hold any implementation specifics
 * Simply initializes the inheritable properties
 */
class Intent {
    /**
     * Constructor initializes the handler and names of the intent
     * @param {object?} params object that contains two properties
     * name: name of the intent to be used in the intent name registration
     * handler: callback function to be called when intent signal occurs
     */
    constructor(params) {
        let {name, handler} = params || {};
        this.name_ = name;
        this.handler_ = handler;
        this.app_ = app;
    }

    /**
     * Getter for intent handler
     * @return {function!} call back funtion for intent registring
     */
    get handler() {
        return this.handler_;
    }

    /**
     * Getter for name of intent
     * @return {string!} name of intent
     */
    get name() {
        return this.name_;
    }

    /**
     * Getter for the google app object for processing intents
     */
    get app() {
        return this.app_;
    }
}

module.exports = {Intent};