const assert = require('assert');

describe('Resubmit PPL', () => {

  it('can be resubmitted', () => {
    browser.withUser('autoproject');
    browser.url('/');

    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`[title="${process.env.PROJECT_TITLE}"]`).isDisplayed());
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).$('a=PPL application').click();

    browser.$('label=Edit and resubmit the application').click();
    browser.$('button=Continue').click();

    browser.$('button=Continue').click();
    browser.$('input[name="ready"][value="Yes"]').click();
    browser.$('button=Submit PPL application').click();

    assert.equal(browser.$('.page-header h1').getText(), 'Project application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Submitted');
    console.log('Resubmitted application');
  });

  it('must be re-endorsed on submit', () => {
    browser.withUser('holc');
    browser.url('/');

    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`[title="${process.env.PROJECT_TITLE}"]`).isDisplayed());
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).$('a=PPL application').click();

    browser.$('label=Endorse application').click();
    browser.$('button=Continue').click();
    browser.$('button=Endorse application').click();

    assert.equal(browser.$('.page-header h1').getText(), 'Project application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Endorsed');

    console.log('Endorsed application');
  });

});
