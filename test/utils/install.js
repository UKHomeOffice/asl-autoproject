const gotoOutstandingTasks = require('./goto-outstanding-tasks');
const completeRichText = require('./complete-rich-text');

module.exports = () => {
  browser.addCommand('gotoOutstandingTasks', gotoOutstandingTasks);
  browser.addCommand('completeRichText', completeRichText, true);
};
