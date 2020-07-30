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

    assert.equal(browser.$('.page-header h1').getText(), 'Personal licence application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Approved');
    console.log('Granted licence');
  });

});
