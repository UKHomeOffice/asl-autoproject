const config = require('../../utils/config');

module.exports = env => config(`${__dirname}/specs/index.js`, 'internal');
