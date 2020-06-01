const assert = require('assert');
const { taskAssertions } = require('../../utils');

describe('PPL Application', () => {

  it('can grant a PPL', () => {
    browser.withUser('licensing');
    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$('td*=Auto Project').isDisplayed());
    console.log('Found task for PIL');
    browser.$('td*=Auto Project').$('a=PIL application').click();

    taskAssertions(browser);

    browser.$('label=Grant licence').click();
    browser.$('button=Continue').click();
    browser.$('button=Grant licence').click();

    assert.ok(browser.$('h1=Licence granted').isDisplayed());
    console.log('Granted licence');
  });

});
