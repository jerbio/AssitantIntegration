let constants = {
    url: '',
    localUrl: 'https://localhost:44322/',
    publicUrl: 'https://mytilerkid.azurewebsites.net/',
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
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
} else {
    constants.url = constants.publicUrl;
}
// constants.url = constants.publicUrl;
constants.api = constants.url+'api/';
module.exports = {constants};
