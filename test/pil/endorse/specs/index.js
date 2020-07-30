const assert = require('assert');
const { taskAssertions } = require('../../utils');

describe('PIL Application', () => {

  it('can endorse a PIL', () => {
    browser.withUser('ntco');

    browser.url('/');

    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$('td*=Auto Project').isDisplayed());
    console.log('Found task for PIL');
    browser.$('td*=Auto Project').$('a=PIL application').click();

    taskAssertions(browser);

    console.log('Completed assertions');

    browser.$('label=Endorse application').click();
    browser.$('button=Continue').click();
    browser.$('button=Endorse application').click();

    assert.equal(browser.$('.page-header h1').getText(), 'Personal licence application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Endorsed');

    console.log('Endorsed application');
  });

});
