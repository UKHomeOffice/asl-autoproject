const assert = require('assert');
const { sample } = require('lodash');

const addProtocol = (browser, title) => {
  if (!browser.$('input[name$=".title"]').isDisplayed()) {
    console.log('Adding another protocol');
    browser.$('button=Add another protocol').click();
    browser.$('input[name$=".title"]').waitForExist();
  }

  browser.$('input[name$=".title"]').setValue(title);
  browser.$('.protocol.panel').$('button=Continue').click();

  browser.$(`h2*=${title}`).waitForDisplayed();

  const openProtocol = browser.$('section.protocol:last-of-type');
  openProtocol.$('input[name$=".severity"]').setValue(sample(['Mild', 'Moderate', 'Severe', 'Non-recovery']));

  openProtocol.$('h3=Type of animals').click();
  openProtocol.$('select[name$=".speciesId"]').selectByVisibleText('Camelids');
  openProtocol.$('label[for$=".genetically-altered-true"]').click();
  openProtocol.$('input[name$=".quantity"]').setValue(Math.ceil(Math.random() * 1000));
  openProtocol.$('input[name$=".life-stages"]').setValue(sample('Juvenile', 'Adult', 'Pregnant female', 'Neonate'));

  openProtocol.$('h3=Continued use/re-use').click();
  openProtocol.$('[name$=".continued-use"]').completeRichText();
  openProtocol.$('[name$=".reuse"]').completeRichText();

  openProtocol.$('h3=Steps').click();
  openProtocol.$('[name$=".steps"]').completeRichText();

  openProtocol.$('h3=Fate of animals').click();
  openProtocol.$('label[for$=".fate-continued-use"]').click();
  openProtocol.$('[name$=".fate-justification"]').completeRichText();

  openProtocol.$('h3=Adverse effects').click();
  openProtocol.$('[name$=".adverse-effects"]').completeRichText();
};

describe('PPL Application', () => {

  it('can apply for a PPL', () => {
    console.log(process.env.FAST ? '*** Fast mode enabled ***' : '');

    browser.withUser('autoproject');

    browser.gotoEstablishment();
    browser.$('a=Projects').click();
    browser.$('a=Drafts').click();
    browser.$(`a=${process.env.PROJECT_TITLE}`).click();

    assert.ok(browser.$(`h1=${process.env.PROJECT_TITLE}`).isDisplayed());

    browser.$('a=Open draft').click();

    // complete introductory details
    browser.$('a=Introductory details').click();

    browser.$('input[name="keyword-0"]').setValue('keyword-0');
    browser.$('input[name="keyword-1"]').setValue('keyword-1');
    browser.$('input[name="keyword-2"]').setValue('keyword-2');
    browser.$('input[name="keyword-3"]').setValue('keyword-3');
    browser.$('input[name="keyword-4"]').setValue('keyword-4');

    browser.$('select[name="years"]').selectByVisibleText('5');
    browser.$('select[name="months"]').selectByVisibleText('0');
    browser.$('label[for="continuation-false"]').click();
    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed introductory details');

    // complete experience
    browser.$('a=Experience').click();
    browser.$('[name="experience-knowledge"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed experience');

    // complete resources
    browser.$('a=Resources').click();
    browser.$('[name="other-resources"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed resources');

    // complete establishments
    browser.$('a=Establishments').click();
    browser.$('input[name="other-establishments"][value="true"]').click();
    browser.$('.control-panel').$('button=Continue').click();

    browser.$('label=Marvell Pharmaceutical').click();
    browser.$('[name$="establishment-about"]').completeRichText();
    browser.$('[name$="establishment-supervisor"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed establishments');

    // complete POLES
    browser.$('a=Places other than a licensed establishment (POLES)').click();
    browser.$('[name="poles-list"]').completeRichText();
    browser.$('[name="poles-justification"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed POLES');

    // complete background
    browser.$('a=Background').click();
    browser.$('[name="background"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed background');

    // complete benefits
    browser.$('a=Benefits').click();
    browser.$('[name="benefits"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed benefits');

    // complete references
    browser.$('a=References').click();
    browser.$('[name="references"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed references');

    // complete purpose
    browser.$('a=Purpose').click();

    browser.$('label[for="purpose-purpose-a"]').click();
    browser.$('label[for="purpose-purpose-b"]').click();
    browser.$('label[for="purpose-b-purpose-b1"]').click();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed purpose');

    // complete aims and objectives
    browser.$('a=Aims and objectives').click();
    browser.$('[name="aims"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed aims and objectives');

    // complete project plan
    browser.$('a=Project plan').click();
    browser.$('[name="plan"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed project plan');

    // complete replacement
    browser.$('a=Replacement').click();
    browser.$('[name="replacement"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed replacement');

    // complete reduction
    browser.$('a=Reduction').click();
    browser.$('[name="reduction"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed reduction');

    // complete refinement
    browser.$('a=Refinement').click();
    browser.$('[name="refinement"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed refinement');

    // complete refinement
    browser.$('a=Origin').click();
    browser.$('[name="origin"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed origin');

    // protocols
    browser.$('a=Protocols').click();

    addProtocol(browser, 'Protocol 1 title');
    addProtocol(browser, 'Protocol 2 title');

    browser.$('a.sections-link').click();

    console.log('Completed protocols');

    // complete Cats, dogs, primates, and equidae
    browser.$('a=Cats, dogs, primates, and equidae').click();
    browser.$('[name="domestic"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed cats, dogs, primates and equidae');

    // complete endangered animals
    browser.$('a=Endangered animals').click();
    browser.$('[name="endangered"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed endangered animals');

    // complete animals taken from the wild
    browser.$('a=Animals taken from the wild').click();
    browser.$('[name="wild"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed animals taken from the wild');

    // complete marmosets
    browser.$('a=Marmosets').click();
    browser.$('[name="marmosets"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed marmosets');

    // complete feral animals
    browser.$('a=Feral animals').click();
    browser.$('[name="feral"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed feral animals');

    // complete neuromuscular blocking agents (NMBAs)
    browser.$('a=Neuromuscular blocking agents (NMBAs)').click();
    browser.$('[name="nmbas"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed neuromuscular blocking agents (NMBAs)');

    // complete NTS project summary
    browser.$('a=Project summary').click();
    browser.$('[name="nts-objectives"]').completeRichText();
    browser.$('[name="nts-benefits"]').completeRichText();
    browser.$('[name="nts-numbers"]').completeRichText();
    browser.$('[name="nts-adverse-effects"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed project summary');

    // complete NTS replacement
    browser.$$('a=Replacement')[1].click();
    browser.$('[name="nts-replacement"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed NTS replacement');

    // complete NTS reduction
    browser.$$('a=Reduction')[1].click();
    browser.$('[name="nts-reduction"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed NTS reduction');

    // complete NTS refinement
    browser.$$('a=Refinement')[1].click();
    browser.$('[name="nts-refinement"]').completeRichText();

    browser.$('button=Continue').click();
    browser.$('button=Continue').click();

    console.log('Completed NTS refinement');

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
