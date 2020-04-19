// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module and response creation dependencies from the
// Actions on Google client library.
const {
    dialogflow,
    Permission,
    // Suggestions,
    BasicCard,
  } = require('actions-on-google');

  // const {utility} = require('./utility.js');
// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new Permission({
      context: 'Hi there, to get to know you better',
      permissions: 'NAME',
    }));
  });

// Handle the Dialogflow intent named 'favorite color'.
// The intent collects a parameter named 'color'.
app.intent('Lookup schedule intent', (conv, {scheduleTime}) => {
  setTimeout(() => {
    if (conv.data.userName) {
      // If we collected user name previously, address them by name and use SSML
      // to embed an audio snippet in the response.
      conv.close(`<speak>${conv.data.userName}, your shcedule for today ` +
        `is tomorow again`+
        `${JSON.stringify(scheduleTime)}`);
    } else {
        conv.close(`<speak>We out son`);
    }
  }, 300);
});

  // Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('permissionsIntent', (conv, params, permissionGranted) => {
    if (!permissionGranted) {
      conv.ask(`Ok, no worries. How can your lieutenant help you?`);
      // conv.ask(new Suggestions('Blue', 'Red', 'Green'));
    } else {
      conv.data.userName = conv.user.name.display;
      conv.ask(`Thanks, ${conv.data.userName}. How can I help you?`);
      // conv.ask(new Suggestions('Blue', 'Red', 'Green'));
    }
  });


  const colorMap = {
    'indigo taco': {
      title: 'Indigo Taco',
      text: 'Indigo Taco is a subtle bluish tone.',
      image: {
        url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDN1JRbF9ZMHZsa1k/style-color-uiapplication-palette1.png',
        accessibilityText: 'Indigo Taco Color',
      },
      display: 'WHITE',
    },
    'pink unicorn': {
      title: 'Pink Unicorn',
      text: 'Pink Unicorn is an imaginative reddish hue.',
      image: {
        url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDbFVfTXpoaEE5Vzg/style-color-uiapplication-palette2.png',
        accessibilityText: 'Pink Unicorn Color',
      },
      display: 'WHITE',
    },
    'blue grey coffee': {
      title: 'Blue Grey Coffee',
      text: `Calling out to rainy days, Blue Grey Coffee `+
            `brings to mind your favorite coffee shop.`,
      image: {
        url: 'https://storage.googleapis.com/material-design/publish/material_v_12/assets/0BxFyKV4eeNjDZUdpeURtaTUwLUk/style-color-colorsystem-gray-secondary-161116.png',
        accessibilityText: 'Blue Grey Coffee Color',
      },
      display: 'WHITE',
    },
  };

  // Handle the Dialogflow intent named 'favorite fake color'.
  // The intent collects a parameter named 'fakeColor'.
  app.intent('favorite fake color', (conv, {fakeColor}) => {
    // Present user with the corresponding basic card and end the conversation.
    conv.close(`Here's the color`, new BasicCard(colorMap[fakeColor]));
  });
// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);
