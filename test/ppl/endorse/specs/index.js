const assert = require('assert');

describe('PPL endorsement', () => {

  it('can be endorsed by an admin user', () => {
    browser.withUser('holc');
    browser.url('/');

    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`[title="${process.env.PROJECT_TITLE}"]`).isDisplayed());
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).$('a=PPL application').click();

    browser.$('label=Endorse application').click();
    browser.$('button=Continue').click();

    browser.$('input[name="awerb"][value="Yes"]').click();
    browser.$('textarea[name="awerb-review-date"]').setValue('University of Croydon - 2/3/2019');

    browser.$('button=Endorse application').click();

    assert.equal(browser.$('.page-header h1').getText(), 'Project application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Endorsed');

    console.log('Endorsed application');
  });

});
