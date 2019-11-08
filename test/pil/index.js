const pipeline = require('../utils/pipeline');

module.exports = ({ env, args }) => {
  const steps = [
    'apply',
    'endorse',
    'grant'
  ];
  return pipeline(steps, { root: __dirname, env });
};
