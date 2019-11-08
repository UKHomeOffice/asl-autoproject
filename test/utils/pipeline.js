try {
  require('dotenv').config();
} catch (e) {}

const path = require('path');
const { spawn } = require('child_process');

const runPipelineStep = (file, env) => {
  const proc = spawn('npm', ['run', 'test:run', '--', file], { env, stdio: 'inherit' });
  return new Promise((resolve, reject) => {
    proc.on('close', code => {
      if (code) {
        const err = new Error('Test run failed');
        err.code = code;
        return reject(err);
      }
      resolve();
    });
    proc.on('error', reject);
  });
};

module.exports = (steps, { root, env }) => {
  env = { ...process.env, ...env };
  return steps.reduce((p, step) => {
    const filename = path.join(root, step, 'config.js');
    return p.then(() => {
      console.log(`Executing test pipeline step: ${step}`);
      return runPipelineStep(filename, env);
    });
  }, Promise.resolve());

};
