const gotoTasks = require('./goto-tasks');
const completeRichText = require('./complete-rich-text');
const gotoPlaces = require('./goto-places');

module.exports = () => {
  browser.addCommand('gotoOutstandingTasks', gotoTasks('Outstanding'));
  browser.addCommand('gotoCompletedTasks', gotoTasks('Completed'));
  browser.addCommand('completeRichText', completeRichText, true);
  browser.addCommand('gotoPlaces', gotoPlaces);
};
