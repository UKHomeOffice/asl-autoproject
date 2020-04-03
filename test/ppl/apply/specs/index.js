const assert = require('assert');
const { paragraphs, waitForSync } = require('../../../utils');

const completeRichTextField = (browser, name) => {
  // If the fast flag is set fill in a lot less text
  const value = process.env.FAST ? paragraphs(1, 2, { words: [5, 10] }) : paragraphs();
  browser.$(`[name$="${name}"]`).click();
  value.forEach(v => browser.keys(v));
};

const continueAndComplete = browser => {
  browser.$('.control-panel').click('button=Continue');
  browser.click('input[name="complete"][value="true"]');
  browser.click('button=Continue');
};

const addProtocol = (browser, title) => {
  console.log(`Starting protocol '${title}'`);

  // if there's a completed protocol then add another
  if (browser.isVisible('section.protocol.complete')) {
    browser.click('button=Add another protocol');
    browser.waitForExist('input[name$=".title"]');
  }

  browser.$('.protocol.panel').$('input[name$=".title"]').setValue(title);
  browser.pause(500);
  browser.$('.protocol.panel').click('button=Continue');

  waitForSync(browser);
  const openProtocol = browser.$('.protocol:not(.complete)');

  completeRichTextField(openProtocol, '.description');
  openProtocol.click('input[name$=".severity"][value="moderate"]');
  completeRichTextField(openProtocol, '.severity-proportion');
  completeRichTextField(openProtocol, '.severity-details');
  openProtocol.click('input[name$=".locations"][value="University of Croydon"]');
  // results in POLE condition being added to protocol
  openProtocol.click('input[name$=".locations"][value="First POLE"]');
  console.log('  Completed details');

  openProtocol.click('h3=Animals used in this protocol');
  openProtocol.click('input[name$=".species"][value="mice"]');
  openProtocol.click('input[name$=".life-stages"][value="adult"]');
  // results in "continued use on to a protocol" condition being added to protocol
  openProtocol.click('input[name$=".continued-use"][value="true"]');
  // results in reuse condition being added to protocol
  openProtocol.click('input[name$=".reuse"][value="true"]');
  openProtocol.$('input[name$=".maximum-animals"]').setValue('100');
  openProtocol.$('input[name$=".maximum-times-used"]').setValue('1');
  console.log('  Completed animals');

  openProtocol.click('h3=Genetically altered animals (GAA)');
  // results in transfer authorisation being added to project, if one of the following species are also selected:
  // mice, rats, guinea-pigs, hamsters, gerbils, other-rodents, common-frogs, african-frogs, zebra-fish
  openProtocol.click('input[name$=".gaas"][value="true"]');
  console.log('  Completed GAAs');

  openProtocol.click('h3=Steps');
  completeRichTextField(openProtocol, '.title');

  openProtocol.click('input[name$=".optional"][value="false"]');
  openProtocol.click('input[name$=".adverse"][value="false"]');
  openProtocol.click('button=Save step');
  openProtocol.click('button=Add another step');
  completeRichTextField(openProtocol, '.title');
  openProtocol.click('input[name$=".optional"][value="false"]');
  openProtocol.click('input[name$=".adverse"][value="false"]');
  openProtocol.click('button=Save step');
  console.log('  Completed steps');

  openProtocol.click('h3=Animal experience');
  completeRichTextField(openProtocol, '.experience-summary');
  completeRichTextField(openProtocol, '.experience-endpoints');
  console.log('  Completed experience');

  openProtocol.click('h3=Experimental design');
  completeRichTextField(openProtocol, '.outputs');
  openProtocol.click('input[name$=".quantitative-data"][value="false"]');
  console.log('  Completed experimental design');

  openProtocol.click('h3=Protocol justification');
  completeRichTextField(openProtocol, '.most-appropriate');
  completeRichTextField(openProtocol, '.most-refined');
  completeRichTextField(openProtocol, '.scientific-endpoints');
  completeRichTextField(openProtocol, '.scientific-suffering');
  completeRichTextField(openProtocol, '.scientific-endpoints-justification');
  openProtocol.click('input[name$=".justification-substances"][value="false"]');
  console.log('  Completed justification');

  openProtocol.click('h3=Fate of animals');
  openProtocol.click('input[name$=".fate"][value="killed"]');
  // results in continued use on another protocol in same project
  openProtocol.click('input[name$=".fate"][value="continued-use"]');
  // results in continued use in another project
  openProtocol.click('input[name$=".fate"][value="continued-use-2"]')
  console.log('  Completed fate');

  openProtocol.click('input[name="complete"][value="true"]');
  openProtocol.click('button=Continue');
  console.log(`Completed protocol '${title}'`);
};

describe('PPL Application', () => {

  it('can apply for a PPL', () => {
    console.log(process.env.FAST ? '*** Fast mode enabled ***' : '');

    browser.timeouts('implicit', 2000);
    browser.withUser('autoproject');

    browser.url('/');

    browser.waitForExist('=View establishment information');
    browser.click('=View establishment information');
    browser.click('a=Projects');
    browser.click('button=Apply for project licence');

    assert.ok(browser.isVisible('h1=Untitled project'));
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
    browser.click('summary=Non-human primates');
    // results in marmosets condition if "marmoset-colony" is also false.
    browser.click('input[name="NHP"][value="marmosets"]');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 1);
    console.log(`Project title is '${process.env.PROJECT_TITLE}'`);
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

    // resuls in code-of-practice condition being added to project
    browser.click('input[name="establishments-care-conditions"][value="false"]');
    completeRichTextField(browser, 'establishments-care-conditions-justification');
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
    browser.click('input[name="transfer-surgically-prepared"][value="true"]');
    browser.click('input[name="transfer-acclimatisation"][value="true"]');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 5);
    console.log('Completed transfer and movement');

    // complete poles
    browser.click('a=Places other than a licensed establishment (POLEs)');
    browser.click('input[name="poles"][value="true"]');
    completeRichTextField(browser, 'poles-justification');
    browser.$('.control-panel').click('button=Continue');

    // results in the POLEs condition being added to the project
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
    // results in continuation authorisation being added to project
    browser.click('input[name="transfer-expiring"][value="true"]');
    completeRichTextField(browser, 'expiring-yes');

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

    addProtocol(browser, 'Protocol 1 title');
    addProtocol(browser, 'Protocol 2 title');

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
    browser.click('input[name="fate-of-animals-nts"][value="true"]');
    // results in rehoming authorisation being added to project.
    browser.click('input[name="fate-of-animals"][value="rehomed"]');
    // results in setting-free authorisation being added to project.
    browser.click('input[name="fate-of-animals"][value="set-free"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 13);
    console.log('Completed fate of animals');

    // complete NHPs
    browser.click('a=Non-human primates');
    completeRichTextField(browser, 'nhps');
    browser.click('input[name="nhps-endangered"][value="false"]');
    // there are 2 fields with the same name "nhps-justification", we only want the visible one
    browser.$$('[name="nhps-justification"]')
      .find(elem => elem.isVisible())
      .click();
    const nhpsJustificationValue = process.env.FAST ? paragraphs(1, 2, { words: [5, 10] }) : paragraphs();
    nhpsJustificationValue.forEach(v => browser.keys(v));

    browser.click('input[name="wild-caught-primates"][value="false"]');
    // results in marmosets condition being added (if marmosets also selected in species)
    browser.click('input[name="marmoset-colony"][value="false"]');
    completeRichTextField(browser, 'marmoset-colony-justification');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 14);
    console.log('Completed NHPs');

    // complete purpose bred animals
    browser.click('a=Purpose bred animals');
    // results in 'non-purpose-bred-sched-2' condition being added to project
    browser.click('input[name="purpose-bred"][value="false"]');
    completeRichTextField(browser, 'purpose-bred-sourced');
    completeRichTextField(browser, 'purpose-bred-justification');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 15);
    console.log('Completed purpose bred animals');

    // complete endangered animals
    browser.click('a=Endangered animals');
    browser.click('input[name="endangered-animals"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 16);
    console.log('Completed endangered animals');

    // complete animals taken from the wild
    browser.click('a=Animals taken from the wild');
    // results in wild condition being added to project
    browser.click('input[name="wild-animals"][value="true"]');
    completeRichTextField(browser, 'wild-animals-justification');
    completeRichTextField(browser, 'wild-animals-caught');
    completeRichTextField(browser, 'wild-animals-potential-harms');
    browser.click('input[name="non-target-species-capture-methods"][value="false"]');
    completeRichTextField(browser, 'wild-animals-competence');
    completeRichTextField(browser, 'wild-animals-examine');
    browser.click('input[name="wild-animals-vet"][value="true"]');
    browser.click('input[name="wild-animals-poor-health"][value="false"]');

    browser.click('button=Continue');
    completeRichTextField(browser, 'wild-animals-transport');
    completeRichTextField(browser, 'wild-animals-killing-method');
    browser.click('input[name="wild-animals-marked"][value="false"]');
    browser.click('input[name="wild-animals-devices"][value="false"]');
    browser.click('input[name="wild-animals-declaration"][value="true"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 17);
    console.log('Completed animals taken from wild');

    // complete feral animals
    browser.click('a=Feral animals');
    // results in feral condition being added to project
    browser.click('input[name="feral-animals"][value="true"]');
    completeRichTextField(browser, 'feral-animals-justification');
    completeRichTextField(browser, 'feral-animals-essential');
    completeRichTextField(browser, 'feral-animals-procedures');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 18);
    console.log('Completed feral animals');

    // complete NMBAs
    browser.click('a=Neuromuscular blocking agents (NMBAs)');
    browser.click('input[name="nmbas-used"][value="true"]');
    browser.click('button=Continue');
    browser.click('button=Continue');
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 19);
    console.log('Completed NMBAs');

    // complete reusing-animals
    browser.click('a=Re-using animals');
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 20);
    console.log('Completed re-using animals');

    // complete setting free
    browser.click('a=Setting animals free');
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 21);
    console.log('Completed setting animals free');

    // complete rehoming
    browser.click('a=Rehoming animals');
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 22);
    console.log('Completed Rehoming animals');

    // complete commercial slaugher
    browser.click('a=Commercial slaughter');
    // results in slaughter authorisation being added to project
    browser.click('input[name="commercial-slaughter"][value="true"]');
    completeRichTextField(browser, 'commercial-slaughter-hygiene');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 23);
    console.log('Completed commercial slaughter');

    // complete human material
    browser.click('a=Animals containing human material');
    browser.click('input[name="animals-containing-human-material"][value="false"]');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 24);
    console.log('Completed human material');

    // complete replacement
    browser.click('a=Replacement');
    browser.$('.nts').click('button=Continue');
    completeRichTextField(browser, 'replacement-why');
    completeRichTextField(browser, 'replacement-alternatives');
    completeRichTextField(browser, 'replacement-justification');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, 25);
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
    assert.equal(browser.$$('.badge.complete').length, 26);
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
    assert.equal(browser.$$('.badge.complete').length, 27);
    console.log('Completed refinement');

    // complete nts review
    browser.click('a=Review');
    browser.click('input[name="complete"][value="true"]');
    browser.click('button=Continue');

    assert.equal(browser.$$('.badge.complete').length, 28);
    console.log('Completed NTS review');

    // submit application
    waitForSync(browser);
    browser.click('button=Continue');

    browser.click('input[name="awerb"][value="Yes"]');
    browser.$('textarea[name="awerb-review-date"]').setValue('University of Croydon - 2/3/2019');
    browser.click('input[name="ready"][value="Yes"]');
    browser.click('button=Submit PPL application');

    assert.ok(browser.isVisible('h1=Application submitted'));
    console.log('Submitted application');

    browser.url('/');
    browser.click('a=In progress');

    assert.ok(browser.$('a=PPL application').isExisting());
  });

});
