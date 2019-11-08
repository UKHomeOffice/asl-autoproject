const assert = require('assert');
const gotoOutstandingTasks = require('../../../utils/goto-outstanding-tasks');

describe('PPL endorsement', () => {

  it('can be endorsed by an admin user', () => {
    browser.timeouts('implicit', 2000);
    browser.withUser('holc');
    browser.url('/');

    gotoOutstandingTasks(browser);

    // find task in task list
    assert.ok(browser.isVisible(`[title="${process.env.PROJECT_TITLE}"]`));
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).click('a=PPL application');

    browser
      .click('label=Endorse application')
      .click('button=Continue')
      .click('button=Endorse application');

    assert.equal(browser.getText('h1'), 'Application endorsed');

    console.log('Endorsed application');
  });

});
