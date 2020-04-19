let constants = {
    url: 'https://mytilerkid.azurewebsites.net/',
    localUrl: 'https://https://localhost:44322/',
    publicUrl: 'https://https://localhost:44322/',
    api: '',
};
let isProd = false;
if (process.env &&
    process.env.NODE_ENV &&
    process.env.NODE_ENV.includes('prod')) {
    isProd = true;
}
isLocal = !isProd;
if (isLocal) {
    constants.url = constants.localUrl;
} else {
    constants.url = constants.publicUrl;
}

constants.api = constants.url+'api/';
module.exports = {constants};
