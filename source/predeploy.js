'use strict';

let ncp = require('ncp').ncp;

let destinationFolder = '../deploy/functions';
ncp.limit = 16;

let source = './';
let copyOptions = {
    filter: (fileName)=> !fileName.includes('predeploy.js'),
};

ncp(source, destinationFolder, copyOptions, (err) => {
 if (err) {
   return console.error(err);
 }
 console.log('done copying files!');
});
