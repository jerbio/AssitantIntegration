const {utility} = require('../utility');
let conversationUtility = {
    concatString: ({stringCollection, prepositionDelimiter = false}) => {
        let retValue = '';
        let prepositions = ['and', 'also', 'additionally'];
        if (utility.isArray(stringCollection) &&
            !utility.isUndefinedOrNull(stringCollection)) {
            let lastrtring = stringCollection[stringCollection.length - 1];
            let isAndable = stringCollection.length > 1;
            retValue ='';
            if (isAndable) {
                retValue+=' ';
                let excludingLastString = stringCollection
                    .slice(0, stringCollection.length - 1);
                excludingLastString.forEach((eachString) => {
                    retValue += eachString;
                    if (prepositionDelimiter) {
                        let prepositionIndex = Math.round(
                            (Math.random() * preposition.length - 1)
                        );
                        let preposition = prepositions[prepositionIndex];
                        retValue += ' '+preposition+' ';
                    } else {
                        retValue += ', ';
                    }
                });
                if (!prepositionDelimiter) {
                    retValue += ' and ';
                }
            }

            retValue += lastrtring;
        } else {
            throw new Error(
                'The provided strings needs to be an array of strings'
                );
        }

        return retValue;
    },
};

module.exports = conversationUtility;
