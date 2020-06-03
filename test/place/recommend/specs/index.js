const assert = require('assert');

describe('Recommend place', () => {
  it('can recommend a place', () => {
    browser.withUser('inspector');
    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`span=${process.env.PLACE_NAME}`).isDisplayed());
    console.log('Found task for place');
    browser.$(`span=${process.env.PLACE_NAME}`).$('..').$('a').click();

    browser.$('input[name="status"][value="inspector-recommended"]').click();

    browser.$('button=Continue').click();

    browser.$('button=Recommend for approval').click();

    assert.ok(browser.$('h1=Recommendation sent').isDisplayed());
    console.log('Recommended task');
  });

});
