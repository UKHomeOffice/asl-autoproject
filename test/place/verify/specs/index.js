const assert = require('assert');

describe('Verify place', () => {
  it('verifies the changes have been made as expected', () => {
    browser.withUser('inspector');
    browser.gotoCompletedTasks();

    // find task in task list
    assert.ok(browser.$(`span=${process.env.PLACE_NAME}`).isDisplayed());
    console.log('Found task for place');
    browser.$$(`span=${process.env.PLACE_NAME}`)[0].$('..').$('a').click();

    assert.ok(browser.$('td=LA, SA').isDisplayed());
    assert.equal(browser.$('span=LA').getAttribute('class'), 'highlight');

    assert.ok(browser.$('td=STH').isDisplayed());
    assert.equal(browser.$('span=LTH').getAttribute('class'), 'highlight');

    assert.ok(browser.$('p=Dogs should be kept out of sight of cats').isDisplayed());
    assert.equal(browser.$('div=Dogs should be kept with cats for company.').getAttribute('class'), 'highlight');

    assert.ok(browser.$('p=Edited comment').isDisplayed());
  });
});
