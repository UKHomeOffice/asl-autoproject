const assert = require('assert');
const gotoOutstandingTasks = require('../../utils/goto-outstanding-tasks');
const { downloadFile } = require('../../utils/download');

const gotoGranted = (browser, title) => {
  browser.url('/');
  browser.click('a=Projects');
  browser.$('.search-box input[type="text"]').setValue(title);
  browser.click('.search-box button');
  browser.waitForExist('table:not(.loading)');
  browser.click(`a=${title}`);
  browser.click('=View granted licence');
};

describe('PPL Grant', () => {

  it('can grant a PPL', () => {
    browser.timeouts('implicit', 2000);
    browser.withUser('licensing');

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

    browser.click('input[name="status"][value="resolved"]');

    browser.click('button=Continue');

    browser.click('button=Grant licence');

    assert.ok(browser.isVisible('h1=Licence granted'));
    console.log('Granted licence');

    gotoGranted(browser, process.env.PROJECT_TITLE);
    const pdf = downloadFile(browser, 'pdf');

    assert.ok(pdf.includes(process.env.PROJECT_TITLE), 'Project title is displayed');
    assert.ok(pdf.includes('Basic User'), 'Licence holder name is displayed');
    assert.ok(pdf.includes('University of Croydon'), 'Primary establishment name is displayed');

    assert.ok(pdf.includes('General constraints'), 'General constraints section is displayed');
    assert.ok(pdf.includes('Standard conditions'), 'Standard conditions section is displayed');

    assert.ok(pdf.includes('Protocol 1 title'), 'First protocol title is displayed');
    assert.ok(pdf.includes('Protocol 2 title'), 'Second protocol title is displayed');
  });

});
