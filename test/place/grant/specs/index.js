const assert = require('assert');

describe('Recommend place', () => {
  it('can recommend a place', () => {
    browser.withUser('inspector');
    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`span=${process.env.PLACE_NAME}`).isDisplayed());
    console.log('Found task for place');
    browser.$(`span=${process.env.PLACE_NAME}`).$('..').$('a').click();

    browser.$('input[name="status"][value="resolved"]').click();

    browser.$('button=Continue').click();

    browser.$('button=Amend licence').click();

    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Approved');
    console.log('Granted amendment');
  });

});
