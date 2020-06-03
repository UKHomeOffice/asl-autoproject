const pipeline = require('../utils/pipeline');
const moment = require('moment');

module.exports = ({ env, args }) => {
  const steps = [
    'create',
    'recommend',
    'grant',
    'edit',
    'recommend',
    'grant',
    'verify'
  ];

  const datetime = moment().format('DD/MM/YYYY hh:mm:ss');
  const PLACE_NAME = args.name || `Autoproject place ${datetime}`;

  return pipeline(steps, { root: __dirname, env: { ...env, PLACE_NAME } });
};
