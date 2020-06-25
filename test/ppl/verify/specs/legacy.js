const assert = require('assert');

describe('PPL Verify', () => {

  it('can see granted PPL content', () => {
    browser.withUser('holc');
    browser.$('h3=University of Croydon').click();
    browser.$('=View establishment information').waitForExist();
    browser.$('=View establishment information').click();
    browser.$('a=Projects').click();

    browser.$('.search-box input[type="text"]').setValue(process.env.PROJECT_TITLE);
    browser.$('.search-box button').click();
    browser.$('table:not(.loading)').waitForExist();
    browser.$(`a=${process.env.PROJECT_TITLE}`).click();
    browser.$('=View granted licence').click();

    const pdf = browser.downloadFile('pdf');

    assert.ok(pdf.includes(process.env.PROJECT_TITLE), 'Project title is displayed');
    assert.ok(pdf.includes('Auto Project'), 'Licence holder name is displayed');
    assert.ok(pdf.includes('University of Croydon'), 'Primary establishment name is displayed');

    assert.ok(pdf.includes('Standard conditions'), 'Standard conditions section is displayed');

    assert.ok(pdf.includes('Protocol 1 title'), 'First protocol title is displayed');
    assert.ok(pdf.includes('Protocol 2 title'), 'Second protocol title is displayed');

    const nts = browser.downloadFile('nts');

    assert.ok(nts.includes('keyword-0, keyword-1, keyword-2, keyword-3, keyword-4'));
  });

});
