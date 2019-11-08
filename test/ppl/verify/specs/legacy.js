const assert = require('assert');
const { downloadFile } = require('../../../utils/download');

describe('PPL Verify', () => {

  it('can see granted PPL content', () => {
    browser.withUser('holc');
    browser.click('h3=University of Croydon');
    browser.waitForExist('=View establishment information');
    browser.click('=View establishment information');
    browser.click('a=Projects');

    browser.$('.search-box input[type="text"]').setValue(process.env.PROJECT_TITLE);
    browser.click('.search-box button');
    browser.waitForExist('table:not(.loading)');
    browser.click(`a=${process.env.PROJECT_TITLE}`);
    browser.click('=View granted licence');

    const pdf = downloadFile(browser, 'pdf');

    assert.ok(pdf.includes(process.env.PROJECT_TITLE), 'Project title is displayed');
    assert.ok(pdf.includes('Basic User'), 'Licence holder name is displayed');
    assert.ok(pdf.includes('University of Croydon'), 'Primary establishment name is displayed');

    assert.ok(pdf.includes('Standard conditions'), 'Standard conditions section is displayed');

    assert.ok(pdf.includes('Protocol 1 title'), 'First protocol title is displayed');
    assert.ok(pdf.includes('Protocol 2 title'), 'Second protocol title is displayed');
  });

});
