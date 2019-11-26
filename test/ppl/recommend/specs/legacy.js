const assert = require('assert');
const gotoOutstandingTasks = require('../../../utils/goto-outstanding-tasks');

describe('PPL Recommendation', () => {

  it('can recommend a PPL', () => {
    browser.timeouts('implicit', 2000);
    browser.withUser('inspector');

    gotoOutstandingTasks(browser);

    // find task in task list
    assert.ok(browser.isVisible(`[title="${process.env.PROJECT_TITLE}"]`));
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).click('a=PPL application');

    browser.click('a=View latest submission');

    browser.click('a=Introductory details');

    assert.ok(browser.isVisible(`p=${process.env.PROJECT_TITLE}`), 'Project title should be visible on introductory details review page');
    console.log('Reviewed project');

    browser.click('a=Next steps');

    browser.click('input[name="status"][value="inspector-recommended"]');

    browser.click('button=Continue');

    browser.click('button=Recommend for approval');

    assert.ok(browser.isVisible('h1=Recommendation sent'));
    console.log('Recommended application');

  });

});