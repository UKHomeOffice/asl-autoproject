const pipeline = require('../utils/pipeline');
const { sentence } = require('../utils');

const LEGACY_TITLE = 'Legacy Autoproject Draft'

module.exports = ({ env, args }) => {
  const steps = [
    'apply',
    'endorse',
    'recommend',
    'grant',
    'verify'
  ];
  const FAST = args.fast ? 'yes' : '';
  const PROJECT_TITLE = args.title || args.legacy
    ? LEGACY_TITLE
    : sentence(6, 15, false);
  const LEGACY = args.legacy ? 'true' : '';

  return pipeline(steps, { root: __dirname, env: { ...env, FAST, PROJECT_TITLE, LEGACY } });
};
