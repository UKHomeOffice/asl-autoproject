const assert = require('assert');
const gotoOutstandingTasks = require('../../../utils/goto-outstanding-tasks');

describe('Return PPL to applicant', () => {

  it('can be returned to applicant', () => {
    browser.timeouts('implicit', 2000);
    browser.withUser('inspector');
    browser.url('/');

    gotoOutstandingTasks(browser);

    // find task in task list
    assert.ok(browser.isVisible(`[title="${process.env.PROJECT_TITLE}"]`));
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).click('a=PPL application');

    browser
      .click('label=Return to applicant')
      .click('button=Continue')
      .setValue('[name="comment"]', 'No way José')
      .click('button=Return to applicant');

    assert.equal(browser.getText('h1'), 'Application returned');

    console.log('Returned application');
  });

});
