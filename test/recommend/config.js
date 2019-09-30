try {
  require('dotenv').config();
} catch (e) {}

module.exports = env => ({
  specs: `${__dirname}/specs/index.js`,
  users: {
    'inspector': process.env.KEYCLOAK_PASSWORD
  },
  urls: {
    local: 'http://localhost:8085',
    dev: 'https://internal-ui.dev.asl.homeoffice.gov.uk',
    preprod: 'https://internal-ui.preprod.asl.homeoffice.gov.uk'
  },
  wdio: {
    maxInstances: 1,
    reporters: ['tap'],
    mochaOpts: {
      timeout: 60 * 60 * 1000
    }
  }
});
