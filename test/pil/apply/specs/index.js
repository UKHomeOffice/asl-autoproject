const assert = require('assert');

describe('PIL Application', () => {

  it('can apply for a PIL', () => {
    browser.withUser('autoproject');

    browser.url('/');
    browser.$('a=Apply for personal licence').click();
    browser.$('button=Apply now').click();

    console.log('Application started');

    // complete procedures
    browser.$('a=Procedures').click();
    browser.$('label*=B.').click();
    browser.$('label*=D.').click();
    browser.$('[name="notesCatD"]').setValue('Category D competency');
    browser.$('label*=F.').click();
    browser.$('[name="notesCatF"]').setValue('Category F type of procedure');
    browser.$('button=Continue').click();

    console.log('Procedures completed');

    // complete animal types
    browser.$('a=Animal types').click();
    browser.$('summary=Small animals').click();
    browser.$('label=Mice').click();
    browser.$('label=Rats').click();
    browser.$('summary=Other').click();
    browser.$('.multi-input-item input').setValue('Jabu');
    browser.$('button=Add another').click();
    browser.$('.multi-input-item:last-of-type input').setValue('Babu');
    browser.$('button=Continue').click();

    console.log('Animal types completed');

    // complete training
    browser.$('a=Training').click();
    browser.$('label[for="update-false"]').click();
    browser.$('button=Continue').click();

    console.log('Training completed');

    // submit
    browser.$('[name="declaration"]').click();
    browser.$('button=Continue').click();
    browser.$('button=Submit to NTCO').click();

    assert.equal(browser.$('.page-header h1').getText(), 'Personal licence application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Submitted');
    console.log('Submitted PIL application');
  });

});
