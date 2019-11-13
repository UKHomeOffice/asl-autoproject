const assert = require('assert');
const gotoOutstandingTasks = require('../../../utils/goto-outstanding-tasks');
const { taskAssertions } = require('../../utils');

describe('PIL Application', () => {

  it('can endorse a PIL', () => {
    browser.withUser('ntco');

    browser.url('/');

    gotoOutstandingTasks(browser);

    // find task in task list
    assert.ok(browser.isVisible('td*=Auto Project'));
    console.log('Found task for PIL');
    browser.$('td*=Auto Project').click('a=PIL application');

    taskAssertions(browser);

    console.log('Completed assertions');

    browser
      .click('label=Endorse application')
      .click('button=Continue')
      .click('button=Endorse application');

    assert.equal(browser.getText('h1'), 'Application endorsed');

    console.log('Endorsed application');
  });

});
