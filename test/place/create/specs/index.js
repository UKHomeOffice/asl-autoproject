const assert = require('assert');

describe('Create place', () => {
  it('can create a place', () => {
    browser.withUser('holc');
    browser.gotoPlaces();

    browser.$('a*=Create').click();
    browser.$('input[name=site]').setValue('Autoproject site');
    browser.$('input[name=area]').setValue('Autoproject area');
    browser.$('input[name=name]').setValue(process.env.PLACE_NAME);
    browser
      .$('#suitability')
      .$('label*=SA')
      .click();

    browser
      .$('#suitability')
      .$('label*=LA')
      .click();

    browser
      .$('#holding')
      .$('label*=STH')
      .click();

    browser.selectMany('nacwos', ['Ian Ayers', 'John Sharp']);
    browser.selectMany('nvssqps', ['Nathan Peters']);

    browser.$('.editable-field').$('a=Add').click();
    browser.$('.editable-field textarea').setValue('Dogs should be kept out of sight of cats');
    browser.$('.editable-field button').click();

    browser.$('textarea[name=comments]').setValue('test');
    browser.$('button*=Submit').click();

    assert.equal(browser.$('h1').getText(), 'Confirm addition');

    assert.equal(browser.$('.field p').getText(), 'test');
    assert.equal(browser.$('.editable-field .highlight').getText(), 'Dogs should be kept out of sight of cats');

    browser.$('input[name="declaration"]').click();
    browser.$('button*=Submit').click();

    assert.equal(browser.$('h1').getText(), 'Amendment submitted');
  });
});
