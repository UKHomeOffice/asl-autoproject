const pipeline = require('../utils/pipeline');
const moment = require('moment');

module.exports = ({ env, args }) => {
  const steps = [
    'create',
    'recommend',
    'grant',
    'edit',
    'grant',
    'verify'
  ];

  const datetime = moment().format('YYYY-MM-DD hh:mm:ss');
  const PLACE_NAME = args.name || `Autoproject place ${datetime}`;

  return pipeline(steps, { root: __dirname, env: { ...env, PLACE_NAME } });
};
