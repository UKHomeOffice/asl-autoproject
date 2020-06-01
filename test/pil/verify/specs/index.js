const assert = require('assert');

describe('PIL Verify', () => {

  it('can see granted PIL content', () => {
    browser.withUser('holc');
    browser.$('h3=University of Croydon').click();
    browser.$('=View establishment information').waitForExist();
    browser.$('=View establishment information').click();
    browser.$('a=People').click();

    browser.$('.search-box input[type="text"]').setValue('Auto Project');
    browser.$('.search-box button').click();
    browser.$('table:not(.loading)').waitForExist();
    browser.$('a=Auto Project').click();
    browser.$('a[href*="/pil/"]').click();

    const pdf = browser.downloadFile('pdf');

    assert.ok(pdf.includes('Auto Project'), 'Licence holder name is displayed');
    assert.ok(pdf.includes('University of Croydon'), 'Primary establishment name is displayed');

    ['Mice', 'Rats', 'Jabu', 'Babu'].forEach(type => {
      assert.ok(pdf.includes(type), `${type} is displayed`)
    });

    assert.ok(pdf.includes('Category F type of procedure'), 'Cat F type displayed');
  });

});
