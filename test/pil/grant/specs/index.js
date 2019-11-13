const assert = require('assert');
const gotoOutstandingTasks = require('../../../utils/goto-outstanding-tasks');
const { taskAssertions } = require('../../utils');

describe('PPL Application', () => {

  it('can grant a PPL', () => {
    browser.withUser('licensing');
    gotoOutstandingTasks(browser);

    // find task in task list
    assert.ok(browser.isVisible('td*=Auto Project'));
    console.log('Found task for PIL');
    browser.$('td*=Auto Project').click('a=PIL application');

    taskAssertions(browser);

    browser
      .click('label=Grant licence')
      .click('button=Continue')
      .click('button=Grant licence');

    assert.ok(browser.isVisible('h1=Licence granted'));
    console.log('Granted licence');
  });

});
