const assert = require('assert');

describe('Return PPL to applicant', () => {

  it('can be returned to applicant', () => {

    browser.withUser('inspector');
    browser.url('/');

    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`[title="${process.env.PROJECT_TITLE}"]`).isDisplayed());
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).$('a=PPL application').click();

    browser.$('label=Return to applicant').click();
    browser.$('button=Continue').click();
    browser.$('[name="comment"]').setValue('No way José');
    browser.$('button=Return to applicant').click();

    assert.equal(browser.$('h1').getText(), 'Application returned');

    console.log('Returned application');
  });

});
