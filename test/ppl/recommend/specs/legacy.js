const assert = require('assert');

describe('PPL Recommendation', () => {

  it('can recommend a PPL', () => {

    browser.withUser('inspector');

    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`[title="${process.env.PROJECT_TITLE}"]`).isDisplayed());
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).$('a=PPL application').click();

    browser.$('a=View latest submission').click();

    browser.$('a=Introductory details').click();

    assert.ok(browser.$('a=Auto Project').isDisplayed(), 'Licence holder should be visible on introductory details page');
    assert.ok(browser.$(`p=${process.env.PROJECT_TITLE}`).isDisplayed(), 'Project title should be visible on introductory details review page');
    console.log('Reviewed project');

    browser.$('a=View all sections').click();
    browser.$('a=Next steps').click();

    browser.$('input[name="status"][value="inspector-recommended"]').click();

    browser.$('button=Continue').click();

    browser.$('button=Recommend for approval').click();

    assert.equal(browser.$('.page-header h1').getText(), 'Project application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Recommendation made');
    console.log('Recommended application');

  });

});
