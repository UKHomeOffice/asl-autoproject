const assert = require('assert');

const continueAndComplete = browser => {
  browser.$('.control-panel').$('button=Continue').click();
  browser.$('input[name="complete"][value="true"]').click();
  browser.$('button=Continue').click();
};

const addProtocol = (browser, title) => {
  console.log(`Starting protocol '${title}'`);

  // if there's a completed protocol then add another
  if (browser.$('section.protocol.complete').isDisplayed()) {
    browser.$('button=Add another protocol').click();
    browser.$('input[name$=".title"]').waitForExist();
  }

  browser.$('.protocol.panel').$('input[name$=".title"]').setValue(title);
  browser.pause(500);
  browser.$('.protocol.panel').$('button=Continue').click();

  browser.waitForSync();
  const openProtocol = browser.$('.protocol:not(.complete)');

  openProtocol.$('[name$=".description"]').completeRichText();
  openProtocol.$('input[name$=".severity"][value="moderate"]').click();
  openProtocol.$('[name$=".severity-proportion"]').completeRichText();
  openProtocol.$('[name$=".severity-details"]').completeRichText();
  openProtocol.$('input[name$=".locations"][value="University of Croydon"]').click();
  // results in POLE condition being added to protocol
  openProtocol.$('input[name$=".locations"][value="First POLE"]').click();
  console.log('  Completed details');

  openProtocol.$('h3=Animals used in this protocol').click();
  openProtocol.$('input[name$=".species"][value="mice"]').click();
  openProtocol.$('input[name$=".life-stages"][value="adult"]').click();
  // results in "continued use on to a protocol" condition being added to protocol
  openProtocol.$('input[name$=".continued-use"][value="true"]').click();
  // results in reuse condition being added to protocol
  openProtocol.$('input[name$=".reuse"][value="true"]').click();
  openProtocol.$('input[name$=".maximum-animals"]').setValue('100');
  openProtocol.$('input[name$=".maximum-times-used"]').setValue('1');
  console.log('  Completed animals');

  openProtocol.$('h3=Genetically altered animals (GAA)').click();
  // results in transfer authorisation being added to project, if one of the following species are also selected:
  // mice, rats, guinea-pigs, hamsters, gerbils, other-rodents, common-frogs, african-frogs, zebra-fish
  openProtocol.$('input[name$=".gaas"][value="true"]').click();
  console.log('  Completed GAAs');

  openProtocol.$('h3=Steps').click();
  openProtocol.$('[name$=".title"]').completeRichText();

  openProtocol.$('input[name$=".optional"][value="false"]').click();
  openProtocol.$('input[name$=".adverse"][value="false"]').click();
  openProtocol.$('button=Save step').click();
  openProtocol.$('button=Add another step').click();
  openProtocol.$('[name$=".title"]').completeRichText();
  openProtocol.$('input[name$=".optional"][value="false"]').click();
  openProtocol.$('input[name$=".adverse"][value="false"]').click();
  openProtocol.$('button=Save step').click();
  console.log('  Completed steps');

  openProtocol.$('h3=Animal experience').click();
  openProtocol.$('[name$=".experience-summary"]').completeRichText();
  openProtocol.$('[name$=".experience-endpoints"]').completeRichText();
  console.log('  Completed experience');

  openProtocol.$('h3=Experimental design').click();
  openProtocol.$('[name$=".outputs"]').completeRichText();
  openProtocol.$('input[name$=".quantitative-data"][value="false"]').click();
  console.log('  Completed experimental design');

  openProtocol.$('h3=Protocol justification').click();
  openProtocol.$('[name$=".most-appropriate"]').completeRichText();
  openProtocol.$('[name$=".most-refined"]').completeRichText();
  openProtocol.$('[name$=".scientific-endpoints"]').completeRichText();
  openProtocol.$('[name$=".scientific-suffering"]').completeRichText();
  openProtocol.$('[name$=".scientific-endpoints-justification"]').completeRichText();
  openProtocol.$('input[name$=".justification-substances"][value="false"]').click();
  console.log('  Completed justification');

  openProtocol.$('h3=Fate of animals').click();
  openProtocol.$('input[name$=".fate"][value="killed"]').click();
  // results in continued use on another protocol in same project
  openProtocol.$('input[name$=".fate"][value="continued-use"]').click();
  // results in continued use in another project
  openProtocol.$('input[name$=".fate"][value="continued-use-2"]').click();
  console.log('  Completed fate');

  openProtocol.$('input[name="complete"][value="true"]').click();
  openProtocol.$('button=Continue').click();
  console.log(`Completed protocol '${title}'`);
};

describe('PPL Application', () => {

  it('can apply for a PPL', () => {
    let complete = 0;
    console.log(process.env.FAST ? '*** Fast mode enabled ***' : '');

    browser.withUser('autoproject');

    browser.gotoEstablishment();
    browser.$('a=Projects').click();
    browser.$('button=Apply for project licence').click();

    assert.ok(browser.$('h2=Untitled project').isDisplayed());
    console.log('Created project');
    // complete introductory details
    browser.$('a=Introductory details').click();

    browser.$('input[name="title"]').setValue(process.env.PROJECT_TITLE);

    browser.$('[name="training-licence"][value="false"]').click();
    browser.$('[name="permissible-purpose"][value="basic-research"]').click();

    browser.$('select[name="years"]').selectByVisibleText('5');
    browser.$('select[name="months"]').selectByVisibleText('0');
    browser.$('summary=Small animals').click();
    browser.$('input[name="SA"][value="mice"]').click();
    browser.$('input[name="SA"][value="rats"]').click();
    browser.$('summary=Non-human primates').click();
    // results in marmosets condition if "marmoset-colony" is also false.
    browser.$('input[name="NHP"][value="marmosets"]').click();
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log(`Project title is '${process.env.PROJECT_TITLE}'`);
    console.log('Completed introductory details');

    // complete aims
    browser.$('a=Aims').click();
    browser.$('.nts').$('button=Continue').click();
    browser.$('[name$="project-aim"]').completeRichText();
    browser.$('[name$="project-importance"]').completeRichText();

    browser.$('input[name="keyword-0"]').setValue('keyword-0');
    browser.$('input[name="keyword-1"]').setValue('keyword-1');
    browser.$('input[name="keyword-2"]').setValue('keyword-2');
    browser.$('input[name="keyword-3"]').setValue('keyword-3');
    browser.$('input[name="keyword-4"]').setValue('keyword-4');
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed aims');

    // complete benefits
    browser.$('a=Benefits').click();
    browser.$('.nts').$('button=Continue').click();
    browser.$('[name$="benefit-outputs"]').completeRichText();
    browser.$('[name$="benefit-who"]').completeRichText();
    browser.$('input[name="benefit-service"][value="true"]').click();
    browser.$('[name$="benefit-service-benefits"]').completeRichText();
    browser.$('[name$="benefit-maximise-outputs"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed benefits');

    // complete project harms
    browser.$('a=Project harms').click();
    browser.$('.nts').$('button=Continue').click();
    browser.$('[name$="project-harms-animals"]').completeRichText();
    browser.$('[name$="project-harms-summary"]').completeRichText();
    browser.$('[name$="project-harms-effects"]').completeRichText();
    browser.$('[name$="project-harms-severity"]').completeRichText();
    browser.$('[name$="project-harms-animals"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed project harms');

    // complete fate of animals
    browser.$('a=Fate of animals').click();
    browser.$('.nts').$('button=Continue').click();
    // results in rehoming authorisation being added to project.
    browser.$('input[name="fate-of-animals"][value="rehomed"]').click();
    // results in setting-free authorisation being added to project.
    browser.$('input[name="fate-of-animals"][value="set-free"]').click();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed fate of animals');

    // complete replacement
    browser.$('a=Replacement').click();
    browser.$('.nts').$('button=Continue').click();
    browser.$('[name$="replacement-why"]').completeRichText();
    browser.$('[name$="replacement-alternatives"]').completeRichText();
    browser.$('[name$="replacement-justification"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed replacement');

    // complete reduction
    browser.$('a=Reduction').click();
    browser.$('.nts').$('button=Continue').click();
    browser.$('input[name="reduction-quantities-mice"]').setValue('100');
    browser.$('input[name="reduction-quantities-rats"]').setValue('100');
    browser.$('[name$="reduction-estimation"]').completeRichText();
    browser.$('[name$="reduction-steps"]').completeRichText();
    browser.$('[name$="reduction-review"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed reduction');

    // complete refinement
    browser.$('a=Refinement').click();
    browser.$('.nts').$('button=Continue').click();
    browser.$('[name$="refinement-models"]').completeRichText();
    browser.$('[name$="refinement-less-sentient"]').completeRichText();
    browser.$('[name$="refinement-3rs-advances"]').completeRichText();
    browser.$('[name$="refinement-explaination"]').completeRichText();
    browser.$('[name$="refinement-published-guidance"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed refinement');

    // complete experience
    browser.$('a=Experience').click();
    browser.$('input[name="experience-projects"][value="true"]').click();
    browser.$('[name$="experience-achievements"]').completeRichText();
    browser.$('[name$="experience-knowledge"]').completeRichText();
    browser.$('[name$="experience-animals"]').completeRichText();
    browser.$('[name$="experience-experimental-design"]').completeRichText();
    browser.$('[name$="experience-others"]').completeRichText();
    browser.$('[name$="funding-previous"]').completeRichText();
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed experience');

    // complete funding
    browser.$('a=Funding').click();
    browser.$('[name$="funding-how"]').completeRichText();
    browser.$('input[name="funding-basic-translational"][value="true"]').click();
    browser.$('[name$="funding-reviewed"]').completeRichText();
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed funding');

    // complete training
    browser.$('a=Training').click();
    browser.$('label[for="training-complete-true"]').click();
    browser.$('button=Continue').click();

    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed training');

    // complete establishments
    browser.$('a=Establishments').click();
    browser.$('input[name="other-establishments"][value="true"]').click();
    browser.$('.control-panel').$('button=Continue').click();

    browser.$('label=Marvell Pharmaceutical').click();
    browser.$('[name$="establishment-about"]').completeRichText();
    browser.$('[name$="establishment-supervisor"]').completeRichText();
    browser.$('.control-panel').$('button=Continue').click();

    // resuls in code-of-practice condition being added to project
    browser.$('input[name="establishments-care-conditions"][value="false"]').click();
    browser.$('[name$="establishments-care-conditions-justification"]').completeRichText();

    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed establishments');

    // complete transfer and movement of animals
    browser.$('a=Transfer and movement of animals').click();
    browser.$('input[name="transfer"][value="true"]').click();
    browser.$('[name$="transfer-why"]').completeRichText();
    browser.$('[name$="transfer-how"]').completeRichText();
    browser.$('[name$="transfer-measures"]').completeRichText();
    browser.$('input[name="transfer-recovery"][value="true"]').click();
    browser.$('input[name="transfer-surgically-prepared"][value="true"]').click();
    browser.$('input[name="transfer-acclimatisation"][value="true"]').click();
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed transfer and movement');

    // complete poles
    browser.$('a=Places other than a licensed establishment (POLEs)').click();
    browser.$('input[name="poles"][value="true"]').click();
    browser.$('[name$="poles-justification"]').completeRichText();
    browser.$('.control-panel').$('button=Continue').click();

    // results in the POLEs condition being added to the project
    browser.$('input[name$=".title"]').setValue('First POLE');
    browser.$('[name$=".pole-info"]').completeRichText();
    browser.$('.control-panel').$('button=Continue').click();

    browser.$('[name$="poles-inspection"]').completeRichText();
    browser.$('[name$="poles-environment"]').completeRichText();
    browser.$('input[name="poles-transfer"][value="false"]').click();
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed POLES');

    // complete scientific background
    browser.$('a=Scientific background').click();
    browser.$('input[name="scientific-background-basic-translational"][value="true"]').click();
    browser.$('[name$="scientific-knowledge-summary"]').completeRichText();
    browser.$('[name$="scientific-knowledge-details"]').completeRichText();
    browser.$('input[name="clinical-condition"][value="false"]').click();

    browser.$('input[name="scientific-background-producing-data"][value="false"]').click();
    browser.$('input[name="scientific-background-non-regulatory"][value="false"]').click();
    browser.$('input[name="scientific-background-genetically-altered"][value="false"]').click();
    browser.$('input[name="scientific-background-vaccines"][value="false"]').click();
    // results in continuation authorisation being added to project
    browser.$('input[name="transfer-expiring"][value="true"]').click();
    browser.$('input[name$=".licence-number"]').setValue('P12345678');
    browser.$('input[name$=".expiry-date-day"]').setValue('01');
    browser.$('input[name$=".expiry-date-month"]').setValue('01');
    browser.$('input[name$=".expiry-date-year"]').setValue('2022');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed scientific background');

    // complete action plan
    browser.$('a=Action plan').click();
    browser.$('input[name$=".title"]').setValue('First objective');
    browser.$('[name$="objective-relation"]').completeRichText();
    browser.$('.control-panel').$('button=Continue').click();

    browser.$('[name$="objectives-alternatives"]').completeRichText();
    browser.$('input[name="objectives-regulatory-authorities"][value="false"]').click();
    browser.$('input[name="objectives-non-regulatory"][value="false"]').click();
    browser.$('input[name="objectives-genetically-altered"][value="false"]').click();
    browser.$('input[name="objectives-vaccines"][value="false"]').click();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed action plan');

    // complete general principles
    browser.$('a=General principles').click();
    browser.$('[name$="general-principles-duplicate"]').completeRichText();
    browser.$('input[name="experimental-design-sexes"][value="true"]').click();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed general principles');

    // complete protocols
    browser.$('a=Protocols').click();

    addProtocol(browser, 'Protocol 1 title');
    addProtocol(browser, 'Protocol 2 title');

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed protocols');

    // complete NHPs
    browser.$('a=Non-human primates').click();
    browser.$('[name$="nhps"]').completeRichText();
    browser.$('input[name="nhps-endangered"][value="false"]').click();
    // there are 2 fields with the same name "nhps-justification", we only want the visible one
    browser.$$('[name="nhps-justification"]')
      .find(elem => elem.isDisplayed())
      .completeRichText();

    browser.$('input[name="wild-caught-primates"][value="false"]').click();
    // results in marmosets condition being added (if marmosets also selected in species)
    browser.$('input[name="marmoset-colony"][value="false"]').click();
    browser.$('[name$="marmoset-colony-justification"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed NHPs');

    // complete purpose bred animals
    browser.$('a=Purpose bred animals').click();
    // results in 'non-purpose-bred-sched-2' condition being added to project
    browser.$('input[name="purpose-bred"][value="false"]').click();
    browser.$('[name$="purpose-bred-sourced"]').completeRichText();
    browser.$('[name$="purpose-bred-justification"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed purpose bred animals');

    // complete endangered animals
    browser.$('a=Endangered animals').click();
    browser.$('input[name="endangered-animals"][value="false"]').click();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed endangered animals');

    // complete animals taken from the wild
    browser.$('a=Animals taken from the wild').click();
    // results in wild condition being added to project
    browser.$('input[name="wild-animals"][value="true"]').click();
    browser.$('[name$="wild-animals-justification"]').completeRichText();
    browser.$('[name$="wild-animals-caught"]').completeRichText();
    browser.$('[name$="wild-animals-potential-harms"]').completeRichText();
    browser.$('input[name="non-target-species-capture-methods"][value="false"]').click();
    browser.$('[name$="wild-animals-competence"]').completeRichText();
    browser.$('[name$="wild-animals-examine"]').completeRichText();
    browser.$('input[name="wild-animals-vet"][value="true"]').click();
    browser.$('input[name="wild-animals-poor-health"][value="false"]').click();

    browser.$('button=Continue').click();
    browser.$('[name$="wild-animals-transport"]').completeRichText();
    browser.$('[name$="wild-animals-killing-method"]').completeRichText();
    browser.$('input[name="wild-animals-marked"][value="false"]').click();
    browser.$('input[name="wild-animals-devices"][value="false"]').click();
    browser.$('input[name="wild-animals-declaration"][value="true"]').click();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed animals taken from wild');

    // complete feral animals
    browser.$('a=Feral animals').click();
    // results in feral condition being added to project
    browser.$('input[name="feral-animals"][value="true"]').click();
    browser.$('[name$="feral-animals-justification"]').completeRichText();
    browser.$('[name$="feral-animals-essential"]').completeRichText();
    browser.$('[name$="feral-animals-procedures"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed feral animals');

    // complete NMBAs
    browser.$('a=Neuromuscular blocking agents (NMBAs)').click();
    browser.$('input[name="nmbas-used"][value="true"]').click();
    browser.$('button=Continue').click();
    browser.$('button=Continue').click();
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed NMBAs');

    // complete reusing-animals
    browser.$('a=Re-using animals').click();
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed re-using animals');

    // complete setting free
    browser.$('a=Setting animals free').click();
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed setting animals free');

    // complete rehoming
    browser.$('a=Rehoming animals').click();
    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed Rehoming animals');

    // complete commercial slaugher
    browser.$('a=Commercial slaughter').click();
    // results in slaughter authorisation being added to project
    browser.$('input[name="commercial-slaughter"][value="true"]').click();
    browser.$('[name$="commercial-slaughter-hygiene"]').completeRichText();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed commercial slaughter');

    // complete human material
    browser.$('a=Animals containing human material').click();
    browser.$('input[name="animals-containing-human-material"][value="false"]').click();

    continueAndComplete(browser);
    assert.equal(browser.$$('.badge.complete').length, ++complete);
    console.log('Completed human material');

    // submit application
    browser.waitForSync();
    browser.$('button=Continue').click();

    browser.$('button=Submit PPL application').click();

    assert.equal(browser.$('.page-header h1').getText(), 'Project application');
    assert.equal(browser.$('h1.govuk-panel__title').getText(), 'Submitted');
    console.log('Submitted application');

    browser.url('/');
    browser.$('a=In progress').click();

    assert.ok(browser.$('a=PPL application').isDisplayed());
  });

});
