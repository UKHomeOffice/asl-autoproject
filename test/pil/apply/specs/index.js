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
    browser.$('[name="notesCatD"]').setValue('Category D competency')
    browser.$('label*=F.').click();
    browser.$('[name="notesCatF"]').setValue('Category F type of procedure')
    browser.$('button=Continue').click();

    console.log('Procedures completed');

    // complete animal types
    browser.$('a=Animal types').click();
    browser.$('summary=Small animals').click();
    browser.$('label=Mice').click();
    browser.$('label=Rats').click();
    browser.$('summary=Other').click();
    browser.$('.multi-input-item input').setValue('Jabu')
    browser.$('button=Add another').click();
    browser.$('.multi-input-item:last-of-type input').setValue('Babu')
    browser.$('button=Continue').click();

    console.log('Animal types completed');

    // complete training
    browser.$('a=Training').click();
    browser.$('label=Yes').click();
    browser.$('button=Continue').click();
    browser.$('[name="certificateNumber"]').setValue('12345');
    browser.$('label=Royal Society of Biology').click();
    browser.$('[name="passDate-day"]').setValue('01');
    browser.$('[name="passDate-month"]').setValue('01');
    browser.$('[name="passDate-year"]').setValue('1999');
    browser.$('button=Continue').click();
    browser.$('label=PILA (theory)').click();
    browser.$('label=PILB').click();
    browser.$('button=Continue').click();
    browser.$('summary=Small animals').click();
    browser.$('label=Mice').click();
    browser.$('button=Continue').click();

    console.log('Training completed')

    // complete exemptions
    browser.$('a=Exemptions').click();
    browser.$('label=Yes').click();
    browser.$('button=Continue').click();
    browser.$('label=PILA (skills)').click();
    browser.$('[name="module-pilaskills-reason"]').setValue('Reason for PILA (skills) exemption');
    browser.$('select[name="module-pilaskills-species-0"]').selectByVisibleText('Cats (Felis catus)')

    browser.$$('a=Add another').find(elem => elem.isDisplayed()).click();

    browser.$('select[name="module-pilaskills-species-1"]').selectByVisibleText('Reptiles (Reptilia)');
    browser.$('button=Continue').click();

    console.log('Exemptions complete');

    // submit
    browser.$('[name="declaration"]').click();
    browser.$('button=Submit to NTCO').click();

    console.log('Submitted PIL application');
  });

});
