const assert = require('assert');

describe('PPL endorsement', () => {

  it('can be endorsed by an admin user', () => {
    browser.withUser('holc');
    browser.url('/');

    browser.click('a=In progress');
    browser.waitForExist('table:not(.loading)');
    browser.click('a=Outstanding');
    browser.waitForExist('table:not(.loading) th a:not(.disabled)');
    browser.click('a=Last changed');
    browser.waitForExist('table:not(.loading) th a:not(.disabled)');
    browser.click('a=Last changed');
    browser.waitForExist('table:not(.loading)');

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
