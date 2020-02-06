const config = require('../../utils/config');
const filename = process.env.LEGACY === 'true' ? 'legacy' : 'index';

module.exports = env => config(`${__dirname}/specs/${filename}.js`, 'internal');
