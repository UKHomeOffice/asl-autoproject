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

    browser.$$('.govuk-date-input').forEach(dateGroup => {
      const inputs = dateGroup.$$('input[type="number"]');
      inputs.find(i => i.getAttribute('name').includes('day')).setValue('01');
      inputs.find(i => i.getAttribute('name').includes('month')).setValue('01');
      inputs.find(i => i.getAttribute('name').includes('year')).setValue('2021');
    });

    browser.$('button=Endorse application').click();

    assert.equal(browser.$('.page-header h1').getText(), 'Project application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Endorsed');

    console.log('Endorsed application');
  });

});
