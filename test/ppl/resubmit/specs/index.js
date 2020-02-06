const assert = require('assert');
const gotoOutstandingTasks = require('../../../utils/goto-outstanding-tasks');

describe('Resubmit PPL', () => {

  it('can be resubmitted', () => {
    browser.timeouts('implicit', 2000);
    browser.withUser('autoproject');
    browser.url('/');

    gotoOutstandingTasks(browser);

    // find task in task list
    assert.ok(browser.isVisible(`[title="${process.env.PROJECT_TITLE}"]`));
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).click('a=PPL application');

    browser
      .click('label=Edit and resubmit the application')
      .click('button=Continue');

    browser.click('button=Continue');
    browser.click('button=Submit PPL application');

    assert.ok(browser.isVisible('h1=Application submitted'));
    console.log('Resubmitted application');
  });

});
