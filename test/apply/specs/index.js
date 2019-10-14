const assert = require('assert');
const { words, paragraphs } = require('../../utils');

const completeRichTextField = (browser, name) => {
  const value = paragraphs();
  browser.$(`[name$="${name}"]`).click();
  value.forEach(v => browser.keys(v));
};

const continueAndComplete = browser => {
  browser.$('.control-panel').click('button=Continue');
  browser.click('input[name="complete"][value="true"]');
  browser.click('button=Continue');
};

const waitForSync = browser => {
  browser.waitUntil(() => {
    browser.refresh();
    try {
      browser.$('.header-title a').getText();
      return true;
    } catch (err) {
      browser.alertDismiss();
      return false;
    }
  });
};

const addProtocol = browser => {
  browser.$('input[name$=".title"]').setValue(words(6));
  browser.$('.protocol').click('button=Continue');
  completeRichTextField(browser, '.description');
  browser.click('input[name$=".severity"][value="moderate"]');
  completeRichTextField(browser, '.severity-proportion');
  completeRichTextField(browser, '.severity-details');
  browser.click('input[name$=".locations"][value="University of Croydon"]');
  completeRichTextField(browser, '.outputs');

  browser.click('h3=Animals used in this protocol');
  browser.click('input[name$=".species"][value="mice"]');
  browser.click('input[name$=".life-stages"][value="adult"]');
  browser.click('input[name$=".continued-use"][value="false"]');
  browser.click('input[name$=".reuse"][value="false"]');
  browser.$('input[name$=".maximum-animals"]').setValue('100');
  browser.$('input[name$=".maximum-times-used"]').setValue('1');

  browser.click('h3=Genetically altered animals (GAA)');
  browser.click('input[name$=".gaas"][value="false"]');

  browser.click('h3=Steps');
  completeRichTextField(browser, '.title');
  browser.click('input[name$=".nmbas"][value="false"]');
  browser.click('input[name$=".optional"][value="false"]');
  browser.click('input[name$=".adverse"][value="false"]');
  browser.click('button=Save step');
  browser.click('button=Add another step');
  completeRichTextField(browser, '.title');
  browser.click('input[name$=".nmbas"][value="false"]');
  browser.click('input[name$=".optional"][value="false"]');
  browser.click('input[name$=".adverse"][value="false"]');
  browser.click('button=Save step');

  browser.click('h3=Animal experience');
  completeRichTextField(browser, '.experience-summary');
  completeRichTextField(browser, '.experience-endpoints');

  browser.click('h3=Experimental design');
  browser.click('input[name$=".quantitative-data"][value="false"]');

  browser.click('h3=Protocol justification');
  completeRichTextField(browser, '.most-appropriate');
  completeRichTextField(browser, '.most-refined');
  completeRichTextField(browser, '.scientific-endpoints');
  completeRichTextField(browser, '.scientific-suffering');
  completeRichTextField(browser, '.scientific-endpoints-justification');
  browser.click('input[name$=".justification-substances"][value="false"]');

  browser.click('h3=Fate of animals');
  browser.click('input[name$=".fate"][value="killed"]');

  browser.click('input[name="complete"][value="true"]');
  browser.$('.protocol').click('button=Continue');

};

describe('PPL Application', () => {

  after(() => new Promise(resolve => setTimeout(resolve, 2000)));

  it('can apply for a PPL', () => {
    browser.withUser('basic');

    browser.url('/');

    browser.click('h3=University of Croydon');
    browser.waitForExist('=View establishment information');
    browser.click('=View establishment information');
    browser.click('a=Projects');

    browser.click('button=Apply for project licence');

    assert.ok(browser.isVisible('h2=Untitled project'));
    console.log('Created project');

    // complete introductory details
    browser.click('a=Introductory details');
    browser.$('.nts').click('button=Continue');
    browser.$('input[name="title"]').setValue(process.env.PROJECT_TITLE);
    completeRichTextField(browser, 'project-aim');
    completeRichTextField(browser, 'project-importance');
    browser.click('[name="permissible-purpose"][value="basic-research"]');
    browser.selectByVisibleText('select[name="years"]', '5');
    browser.selectByVisibleText('select[name="months"]', '0');
    browser.click('summary=Small animals');
    browser.click('input[name="SA"][value="mice"]');
    browser.click('input[name="SA"][value="rats"]');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 1);
    console.log('Completed introductory details');

    // complete experience
    browser.click('a=Experience');
    browser.click('input[name="experience-projects"][value="true"]');
    completeRichTextField(browser, 'experience-achievements');
    completeRichTextField(browser, 'experience-knowledge');
    completeRichTextField(browser, 'experience-animals');
    completeRichTextField(browser, 'experience-experimental-design');
    completeRichTextField(browser, 'experience-others');
    completeRichTextField(browser, 'funding-previous');
    completeRichTextField(browser, 'other-people');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 2);
    console.log('Completed experience');

    // complete funding
    browser.click('a=Funding');
    completeRichTextField(browser, 'funding-how');
    browser.click('input[name="funding-basic-translational"][value="true"]');
    completeRichTextField(browser, 'funding-reviewed');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 3);
    console.log('Completed funding');

    // complete establishments
    browser.click('a=Establishments');
    browser.click('input[name="other-establishments"][value="true"]');
    browser.$('.control-panel').click('button=Continue');

    browser.$('input[name$="establishment-name"]').setValue('Marvell Pharmaceutical');
    completeRichTextField(browser, 'establishment-about');
    completeRichTextField(browser, 'establishment-supervisor');
    browser.$('.control-panel').click('button=Continue');

    browser.click('input[name="establishments-care-conditions"][value="true"]');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 4);
    console.log('Completed establishments');

    // complete transfer and movement of animals
    browser.click('a=Transfer and movement of animals');
    browser.click('input[name="transfer"][value="true"]');
    completeRichTextField(browser, 'transfer-why');
    completeRichTextField(browser, 'transfer-how');
    completeRichTextField(browser, 'transfer-measures');
    browser.click('input[name="transfer-recovery"][value="true"]');
    browser.click('input[name="transfer-acclimatisation"][value="true"]');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 5);
    console.log('Completed transfer and movement');

    // complete poles
    browser.click('a=Places other than a licensed establishment (POLEs)');
    browser.click('input[name="poles"][value="true"]');
    completeRichTextField(browser, 'poles-justification');
    browser.$('.control-panel').click('button=Continue');

    browser.$('input[name$=".title"]').setValue('First POLE');
    completeRichTextField(browser, '.pole-info');
    browser.$('.control-panel').click('button=Continue');

    completeRichTextField(browser, 'poles-inspection');
    completeRichTextField(browser, 'poles-environment');
    browser.click('input[name="poles-transfer"][value="false"]');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 6);
    console.log('Completed POLES');

    // complete scientific background
    browser.click('a=Scientific background');
    browser.click('input[name="scientific-background-basic-translational"][value="true"]');
    completeRichTextField(browser, 'scientific-knowledge-summary');
    completeRichTextField(browser, 'scientific-knowledge-details');
    browser.click('input[name="clinical-condition"][value="false"]');

    browser.click('input[name="scientific-background-producing-data"][value="false"]');
    browser.click('input[name="scientific-background-non-regulatory"][value="false"]');
    browser.click('input[name="scientific-background-genetically-altered"][value="false"]');
    browser.click('input[name="scientific-background-vaccines"][value="false"]');
    browser.click('input[name="transfer-expiring"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 7);
    console.log('Completed scientific background');

    // complete action plan
    browser.click('a=Action plan');
    browser.$('input[name$=".title"]').setValue('First objective');
    completeRichTextField(browser, 'objective-relation');
    browser.$('.control-panel').click('button=Continue');

    completeRichTextField(browser, 'objectives-alternatives');
    browser.click('input[name="objectives-regulatory-authorities"][value="false"]');
    browser.click('input[name="objectives-non-regulatory"][value="false"]');
    browser.click('input[name="objectives-genetically-altered"][value="false"]');
    browser.click('input[name="objectives-vaccines"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 8);
    console.log('Completed action plan');

    // complete general principles
    browser.click('a=General principles');
    completeRichTextField(browser, 'general-principles-duplicate');
    browser.click('input[name="experimental-design-sexes"][value="true"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 9);
    console.log('Completed general principles');

    // complete benefits
    browser.click('a=Benefits');
    browser.$('.nts').click('button=Continue');
    completeRichTextField(browser, 'benefit-outputs');
    completeRichTextField(browser, 'benefit-who');
    browser.click('input[name="benefit-service"][value="true"]');
    completeRichTextField(browser, 'benefit-service-benefits');
    completeRichTextField(browser, 'benefit-maximise-outputs');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 10);
    console.log('Completed benefits');

    // complete protocols
    browser.click('a=Protocols');

    addProtocol(browser);

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 11);
    console.log('Completed protocols');

    // complete project harms
    browser.click('a=Project harms');
    browser.$('.nts').click('button=Continue');
    completeRichTextField(browser, 'project-harms-animals');
    completeRichTextField(browser, 'project-harms-summary');
    completeRichTextField(browser, 'project-harms-effects');
    completeRichTextField(browser, 'project-harms-severity');
    completeRichTextField(browser, 'project-harms-animals');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 12);
    console.log('Completed project harms');

    // complete fate of animals
    browser.click('a=Fate of animals');
    browser.$('.nts').click('button=Continue');
    browser.click('input[name="fate-of-animals-nts"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 13);
    console.log('Completed fate of animals');

    // complete purpose bred animals
    browser.click('a=Purpose bred animals');
    browser.click('input[name="purpose-bred"][value="true"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 14);
    console.log('Completed purpose bred animals');

    // complete endangered animals
    browser.click('a=Endangered animals');
    browser.click('input[name="endangered-animals"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 15);
    console.log('Completed endangered animals');

    // complete animals taken from the wild
    browser.click('a=Animals taken from the wild');
    browser.click('input[name="wild-animals"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 16);
    console.log('Completed animals taken from wild');

    // complete feral animals
    browser.click('a=Feral animals');
    browser.click('input[name="feral-animals"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 17);
    console.log('Completed feral animals');

    // complete commercial slaugher
    browser.click('a=Commercial slaughter');
    browser.click('input[name="commercial-slaughter"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 18);
    console.log('Completed commercial slaughter');

    // complete human material
    browser.click('a=Animals containing human material');
    browser.click('input[name="animals-containing-human-material"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 19);
    console.log('Completed human material');

    // complete replacement
    browser.click('a=Replacement');
    browser.$('.nts').click('button=Continue');
    completeRichTextField(browser, 'replacement-why');
    completeRichTextField(browser, 'replacement-alternatives');
    completeRichTextField(browser, 'replacement-justification');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 20);
    console.log('Completed replacement');

    // complete reduction
    browser.click('a=Reduction');
    browser.$('.nts').click('button=Continue');
    browser.$('input[name="reduction-quantities-mice"]').setValue('100');
    browser.$('input[name="reduction-quantities-rats"]').setValue('100');
    completeRichTextField(browser, 'reduction-estimation');
    completeRichTextField(browser, 'reduction-steps');
    completeRichTextField(browser, 'reduction-review');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 21);
    console.log('Completed reduction');

    // complete refinement
    browser.click('a=Refinement');
    browser.$('.nts').click('button=Continue');
    completeRichTextField(browser, 'refinement-models');
    completeRichTextField(browser, 'refinement-less-sentient');
    completeRichTextField(browser, 'refinement-3rs-advances');
    completeRichTextField(browser, 'refinement-explaination');
    completeRichTextField(browser, 'refinement-published-guidance');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 22);
    console.log('Completed refinement');

    // complete nts review
    browser.click('a=Review');
    browser.click('input[name="complete"][value="true"]');
    browser.click('button=Continue');

    assert.equal(browser.$$('.badge.complete').length, 23);
    console.log('Completed NTS review');

    // submit application
    waitForSync(browser);
    browser.click('button=Continue');

    browser.click('input[name="authority"][value="Yes"]');
    browser.$('input[name="authority-pelholder-name"]').setValue('Bruce Banner');
    browser.$('input[name="authority-endorsement-date"]').setValue('1/3/2019');
    browser.click('input[name="awerb"][value="Yes"]');
    browser.$('textarea[name="awerb-review-date"]').setValue('University of Croydon - 2/3/2019');
    browser.click('input[name="ready"][value="Yes"]');
    browser.click('button=Submit PPL application');

    assert.ok(browser.isVisible('h1=Application sent'));
    console.log('Submitted application');

    browser.url('/');
    browser.click('a=In progress');

    assert.ok(browser.$('a=PPL application').isExisting());
  });

  it('can be endorsed by an admin user', () => {
    browser.withUser('holc');
    browser.url('/');

    browser
      .click('a=PPL application')
      .click('label=Endorse application')
      .click('button=Continue')
      .click('button=Endorse application');

    assert.equal(browser.getText('h1'), 'Application endorsed');

    console.log('Endorsed application');
  });

});
