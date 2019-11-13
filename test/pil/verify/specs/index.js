const assert = require('assert');
const { downloadFile } = require('../../../utils/download');

describe('PIL Verify', () => {

  it('can see granted PIL content', () => {
    browser.withUser('holc');
    browser.click('h3=University of Croydon');
    browser.waitForExist('=View establishment information');
    browser.click('=View establishment information');
    browser.click('a=People');

    browser.$('.search-box input[type="text"]').setValue('Auto Project');
    browser.click('.search-box button');
    browser.waitForExist('table:not(.loading)');
    browser.click('a=Auto Project');
    browser.click('a[href*="/pil/"]');

    const pdf = downloadFile(browser, 'pdf');

    assert.ok(pdf.includes('Auto Project'), 'Licence holder name is displayed');
    assert.ok(pdf.includes('University of Croydon'), 'Primary establishment name is displayed');

    ['Mice', 'Rats', 'Jabu', 'Babu'].forEach(type => {
      assert.ok(pdf.includes(type), `${type} is displayed`)
    });

    assert.ok(pdf.includes('Category F type of procedure'), 'Cat F type displayed');
  });

});
