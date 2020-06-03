const assert = require('assert');

describe('Recommend place', () => {
  it('can recommend a place', () => {
    browser.withUser('licensing');
    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`span=${process.env.PLACE_NAME}`).isDisplayed());
    console.log('Found task for place');
    browser.$(`span=${process.env.PLACE_NAME}`).$('..').$('a').click();

    browser.$('input[name="status"][value="resolved"]').click();

    browser.$('button=Continue').click();

    browser.$('button=Amend licence').click();

    assert.ok(browser.$('h1=Amendment approved').isDisplayed());
    console.log('Granted amendment');
  });

});
