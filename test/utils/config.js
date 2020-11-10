const { helpers } = require('@ukhomeoffice/asl-functional-testing');
const install = require('./install');

module.exports = (specs, env) => {

  const urls = {
    local: 'http://localhost:8080',
    dev: 'https://public-ui.dev.asl.homeoffice.gov.uk',
    preprod: 'https://public-ui.preprod.asl.homeoffice.gov.uk'
  };

  if (env === 'internal') {
    Object.assign(urls, {
      local: 'http://localhost:8085',
      dev: 'https://internal-ui.dev.asl.homeoffice.gov.uk',
      preprod: 'https://internal-ui.preprod.asl.homeoffice.gov.uk'
    });
  }

  return helpers.config({
    specs: [ specs ],
    users: {
      'autoproject': process.env.KEYCLOAK_PASSWORD,
      'holc': process.env.KEYCLOAK_PASSWORD,
      'ntco': process.env.KEYCLOAK_PASSWORD,
      'basic': process.env.KEYCLOAK_PASSWORD,
      'licensing': process.env.KEYCLOAK_PASSWORD,
      'inspector': process.env.KEYCLOAK_PASSWORD,
      'pharmaadmin': process.env.KEYCLOAK_PASSWORD
    },
    urls,
    sample: false,
    flags: ['--whitelisted-ips', '--disable-dev-shm-usage'],
    before: () => install()
  });

};
