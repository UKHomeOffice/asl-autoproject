const gotoTasks = require('./goto-tasks');
const completeRichText = require('./complete-rich-text');
const gotoEstablishment = require('./goto-establishment');
const gotoPlaces = require('./goto-places');

module.exports = () => {
  browser.setTimeout({ implicit: 200 });
  browser.addCommand('gotoOutstandingTasks', gotoTasks('Outstanding'));
  browser.addCommand('gotoCompletedTasks', gotoTasks('Completed'));
  browser.addCommand('completeRichText', completeRichText, true);
  browser.addCommand('gotoEstablishment', gotoEstablishment);
  browser.addCommand('gotoPlaces', gotoPlaces);
};
