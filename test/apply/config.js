try {
  require('dotenv').config();
} catch (e) {}

module.exports = env => ({
  specs: `${__dirname}/specs/index.js`,
  users: {
    'holc': process.env.KEYCLOAK_PASSWORD
  },
  urls: {
    local: 'http://localhost:8080',
    dev: 'https://public-ui.dev.asl.homeoffice.gov.uk',
    preprod: 'https://public-ui.preprod.asl.homeoffice.gov.uk'
  },
  wdio: {
    maxInstances: 1,
    reporters: ['tap'],
    mochaOpts: {
      timeout: 60 * 60 * 1000
    }
  }
});
