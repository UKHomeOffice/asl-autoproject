const assert = require('assert');

describe('Edit place', () => {
  it('can edit a place', () => {
    browser.withUser('holc');
    browser.gotoPlaces();
    browser.$('a=Filter by').click();
    browser.$('#site-label').click();
    browser.$('label=Autoproject site').click();
    browser.$('button=Apply filters').click();

    browser.$('table:not(.loading) th a:not(.disabled)').waitForExist();

    // sort table twice so most recently created _should_ be at the top
    browser.$('thead').$('a=Name').click();
    browser.$('table:not(.loading) th a:not(.disabled)').waitForExist();

    browser.$('thead').$('a=Name').click();
    browser.$('table:not(.loading) th a:not(.disabled)').waitForExist();

    browser.$(`a=${process.env.PLACE_NAME}`).click();

    browser.$('a=Amend area').click();

    // deselect SA
    browser
      .$('#suitability')
      .$('label*=SA')
      .click();

    // deselect STH
    browser
      .$('#holding')
      .$('label*=STH')
      .click();

    // select LTH
    browser
      .$('#holding')
      .$('label*=LTH')
      .click();

    browser.selectMany('nacwos', ['Benjamin Patton']);
    browser.selectMany('nvssqps', ['Aaron Harris']);

    browser.$('.editable-field').$('a=Edit').click();
    browser.$('.editable-field textarea').setValue('Dogs should be kept with cats for company.');
    browser.$('.editable-field button').click();

    browser.$('textarea[name=comments]').setValue('Edited comment');
    browser.$('button*=Submit').click();

    browser.$('input[name="declaration"]').click();
    browser.$('button*=Submit').click();

    assert.equal(browser.$('h1').getText(), 'Amendment submitted');
  });
});
