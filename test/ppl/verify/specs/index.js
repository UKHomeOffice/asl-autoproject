const assert = require('assert');

describe('PPL Verify', () => {

  it('can see granted PPL content', () => {
    browser.withUser('holc');
    browser.gotoEstablishment();
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

    assert.ok(pdf.includes('General constraints'), 'General constraints section is displayed');
    assert.ok(pdf.includes('Standard conditions'), 'Standard conditions section is displayed');

    assert.ok(pdf.includes('Protocol 1 title'), 'First protocol title is displayed');
    assert.ok(pdf.includes('Protocol 2 title'), 'Second protocol title is displayed');

    // conditions
    [
      'Marmosets',
      'Animals taken from the wild',
      'POLEs',
      'Non purpose bred schedule 2 animals',
      'Establishment licences not meeting Code of Practice',
      'Batch testing',
      'Neuromuscular blocking agents (NMBAs)'
    ].forEach(condition => {
      assert.ok(pdf.includes(condition), `PDF should contain condition: "${condition}"`);
    });

    const removedConditionText = 'Standard condition 13(a) of this licence shall not apply';
    assert.ok(!pdf.includes(removedConditionText));

    const amendedConditions = 'Standard condition 13(b) of this licence shall not apply in cases when mice bred for use in procedures are not suitable for the purpose of the programme of work specified in the licence as justified in the project licence application.';
    assert.ok(pdf.includes(amendedConditions));

    const customProtocolConditions = 'Custom condition protocol 1';
    assert.ok(pdf.includes(customProtocolConditions));

    const nts = browser.downloadFile('nts');

    assert.ok(nts.includes('keyword-0, keyword-1, keyword-2, keyword-3, keyword-4'));

  });

  it('admin at additional establishment can see project', () => {
    browser.withUser('pharmaadmin');

    browser.gotoEstablishment('Marvell Pharmaceutical');

    browser.$('a=Projects').click();

    browser.$('.search-box input[type="text"]').setValue(process.env.PROJECT_TITLE);
    browser.$('.search-box button').click();
    browser.$('table:not(.loading)').waitForExist();
    browser.$(`a=${process.env.PROJECT_TITLE}`).click();
    browser.$('=View granted licence').click();
    assert.ok(browser.$(`h1=${process.env.PROJECT_TITLE}`).isDisplayed());
  });

});
