const gotoOutstandingTasks = require('./goto-outstanding-tasks');
const completeRichText = require('./complete-rich-text');

module.exports = () => {
  browser.setTimeout({ implicit: 5000 });
  browser.addCommand('gotoOutstandingTasks', gotoOutstandingTasks);
  browser.addCommand('completeRichText', completeRichText, true);
};
