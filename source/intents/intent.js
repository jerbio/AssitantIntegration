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
        this.yeaName_ = null;
        this.nayName_ = null;
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
     * Getter for name of the yes intent
     * @return {string!} name of intent
     */
    get yeaName() {
        return this.yeaName_;
    }

    /**
     * Getter for name of the no intent
     * @return {string!} name of intent
     */
    get nayName() {
        return this.nayName_;
    }

    /**
     * Getter for the google app object for processing intents
     */
    get app() {
        return this.app_;
    }

    /**
     * Function initializes and sets up object needed across conversations
     * @param {bject!} conv google actions conversation object.
     */
    static initializeTilerStorage(conv) {
        if (conv.user.storage && !conv.user.storage.tilerApp) {
            conv.user.storage.tilerApp = {};
        }

        if (!conv.data.tilerApp) {
            conv.data.tilerApp = {};
        }
    }
}

module.exports = {Intent};
