const assert = require('assert');

describe('PIL Application', () => {

  it('can apply for a PIL', () => {
    browser.withUser('autoproject');

    browser
      .url('/')
      .click('a=Apply for personal licence')
      .click('button=Apply now');

    console.log('Application started');

    // complete procedures
    browser
      .click('a=Procedures')
      .click('label*=B.')
      .click('label*=D.')
      .setValue('[name="notesCatD"]', 'Category D competency')
      .click('label*=F.')
      .setValue('[name="notesCatF"]', 'Category F type of procedure')
      .click('button=Continue');

    console.log('Procedures completed');

    // complete animal types
    browser
      .click('a=Animal types')
      .click('summary=Small animals')
      .click('label=Mice')
      .click('label=Rats')
      .click('summary=Other')
      .setValue('.multi-input-item input', 'Jabu')
      .click('button=Add another')
      .setValue('.multi-input-item:last-of-type input', 'Babu')
      .click('button=Continue');

    console.log('Animal types completed');

    // complete training
    browser
      .click('a=Training')
      .click('label=Yes')
      .click('button=Continue')
      .setValue('[name="certificateNumber"]', '12345')
      .click('label=Royal Society of Biology')
      .setValue('[name="passDate-day"]', '01')
      .setValue('[name="passDate-month"]', '01')
      .setValue('[name="passDate-year"]', '1999')
      .click('button=Continue')
      .click('label=PILA (theory)')
      .click('label=PILB')
      .click('button=Continue')
      .click('summary=Small animals')
      .click('label=Mice')
      .click('button=Continue')

    console.log('Training completed')

    // complete exemptions
    browser
      .click('a=Exemptions')
      .click('label=Yes')
      .click('button=Continue')
      .click('label=PILA (skills)')
      .setValue('[name="module-pilaskills-reason"]', 'Reason for PILA (skills) exemption')
      .selectByVisibleText('select[name="module-pilaskills-species-0"]', 'Cats (Felis catus)');

    browser.$$('a=Add another').find(elem => elem.isVisible()).click();

    browser
      .selectByVisibleText('select[name="module-pilaskills-species-1"]', 'Reptiles (Reptilia)')
      .click('button=Continue');

    console.log('Exemptions complete');

    // submit
    browser
      .click('[name="declarations"]')
      .click('button=Submit to NTCO')

    console.log('Submitted PIL application');
  });

});
