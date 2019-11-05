const assert = require('assert');
const { sample } = require('lodash');
const { words, paragraphs } = require('../../utils');

const completeRichTextField = (browser, name) => {
  // If the fast flag is set fill in a lot less text
  const value = process.env.FAST ? paragraphs(1, 2, { words: [5, 10] }) : paragraphs();
  browser.$(`[name$="${name}"]`).click();
  value.forEach(v => browser.keys(v));
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

const addProtocol = (browser, title) => {
  if (!browser.$('input[name$=".title"]').isVisible()) {
    console.log('Adding another protocol');
    browser.click('button=Add another protocol');
    browser.waitForExist('input[name$=".title"]');
  }

  browser.scroll(0, 5000);

  browser.$('input[name$=".title"]').setValue(title);
  browser.$('.protocol:last-of-type').click('button=Continue');
  waitForSync(browser);

  const openProtocol = browser.$('.protocol:last-of-type');
  openProtocol.setValue('input[name$=".severity"]', sample(['Mild', 'Moderate', 'Severe', 'Non-recovery']));

  openProtocol
    .click('h3=Type of animals')
    .selectByVisibleText('select[name$=".speciesId"]', 'Camelids')
    .click('label[for$=".genetically-altered-true"]')
    .setValue('input[name$=".quantity"]', Math.ceil(Math.random() * 1000))
    .setValue('input[name$=".life-stages"]', sample('Juvenile', 'Adult', 'Pregnant female', 'Neonate'));

  openProtocol.click('h3=Continued use/re-use')
  completeRichTextField(openProtocol, '.continued-use');
  completeRichTextField(openProtocol, '.reuse');

  openProtocol.click('h3=Steps');
  completeRichTextField(openProtocol, '.steps');

  openProtocol
    .click('h3=Fate of animals')
    .click('label[for$=".fate-continued-use"]')
  completeRichTextField(openProtocol, '.fate-justification');

  openProtocol.click('h3=Adverse effects');
  completeRichTextField(openProtocol, '.adverse-effects');
};

describe('PPL Application', () => {

  it('can apply for a PPL', () => {
    console.log(process.env.FAST ? '*** Fast mode enabled ***' : '');

    browser.timeouts('implicit', 2000);
    browser.withUser('basic');

    browser.url('/');

    browser.click('h3=University of Croydon');
    browser.waitForExist('=View establishment information');

    browser
      .click('=View establishment information')
      .click('a=Projects')
      .click('a=Drafts')
      .click(`a=${process.env.PROJECT_TITLE}`);

    assert.ok(browser.isVisible(`h1=${process.env.PROJECT_TITLE}`));

    browser.click('a=Open draft');

    // complete introductory details
    browser
      .click('a=Introductory details')
      .selectByVisibleText('select[name="years"]', '5')
      .selectByVisibleText('select[name="months"]', '0')
      .click('label[for="continuation-false"]')
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed introductory details');

    // complete experience
    browser.click('a=Experience');
    completeRichTextField(browser, 'experience-knowledge');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed experience');

    // complete resources
    browser.click('a=Resources');
    completeRichTextField(browser, 'other-resources')
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed resources');

    // complete establishments
    browser.click('a=Establishments');
    browser.click('input[name="other-establishments"][value="true"]');
    browser.$('.control-panel').click('button=Continue');

    browser.$('input[name$="establishment-name"]').setValue('Marvell Pharmaceutical');
    completeRichTextField(browser, 'establishment-about');
    completeRichTextField(browser, 'establishment-supervisor');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed establishments');

    // complete POLES
    browser.click('a=Places other than a licensed establishment (POLES)');
    completeRichTextField(browser, 'poles-list');
    completeRichTextField(browser, 'poles-justification');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed POLES');

    // complete background
    browser.click('a=Background');
    completeRichTextField(browser, 'background');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed background');

    // complete benefits
    browser.click('a=Benefits');
    completeRichTextField(browser, 'benefits');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed benefits');

    // complete references
    browser.click('a=References');
    completeRichTextField(browser, 'references');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed references');

    // complete purpose
    browser.click('a=Purpose');
    browser
      .click('label[for="purpose-purpose-a"]')
      .click('label[for="purpose-purpose-b"]')
      .click('label[for="purpose-b-purpose-b1"]')
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed purpose');

    // complete aims and objectives
    browser.click('a=Aims and objectives');
    completeRichTextField(browser, 'aims');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed aims and objectives');

    // complete project plan
    browser.click('a=Project plan');
    completeRichTextField(browser, 'plan');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed project plan');

    // complete replacement
    browser.click('a=Replacement');
    completeRichTextField(browser, 'replacement');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed replacement');

    // complete reduction
    browser.click('a=Reduction');
    completeRichTextField(browser, 'reduction');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed reduction');

    // complete refinement
    browser.click('a=Refinement');
    completeRichTextField(browser, 'refinement');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed refinement');

    // complete refinement
    browser.click('a=Origin');
    completeRichTextField(browser, 'origin');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed origin');

    // protocols
    browser.click('a=Protocols');

    addProtocol(browser, 'Protocol 1 title');
    addProtocol(browser, 'Protocol 2 title');

    browser.click('a.sections-link');

    console.log('Completed protocols');

    // complete Cats, dogs, primates, and equidae
    browser.click('a=Cats, dogs, primates, and equidae');
    completeRichTextField(browser, 'domestic');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed cats, dogs, primates and equidae');

    // complete endangered animals
    browser.click('a=Endangered animals');
    completeRichTextField(browser, 'endangered');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed endangered animals');

    // complete animals taken from the wild
    browser.click('a=Animals taken from the wild');
    completeRichTextField(browser, 'wild');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed animals taken from the wild');

    // complete marmosets
    browser.click('a=Marmosets');
    completeRichTextField(browser, 'marmosets');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed marmosets');

    // complete feral animals
    browser.click('a=Feral animals');
    completeRichTextField(browser, 'feral');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed feral animals');

    // complete neuromuscular blocking agents (NMBAs)
    browser.click('a=Neuromuscular blocking agents (NMBAs)');
    completeRichTextField(browser, 'nmbas');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed neuromuscular blocking agents (NMBAs)');

    // complete NTS project summary
    browser.click('a=Project summary');
    completeRichTextField(browser, 'nts-objectives');
    completeRichTextField(browser, 'nts-benefits');
    completeRichTextField(browser, 'nts-numbers');
    completeRichTextField(browser, 'nts-adverse-effects');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed project summary');

    // complete NTS replacement
    browser.$$('a=Replacement')[1].click()
    completeRichTextField(browser, 'nts-replacement');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed NTS replacement');

    // complete NTS reduction
    browser.$$('a=Reduction')[1].click()
    completeRichTextField(browser, 'nts-reduction');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed NTS reduction');

    // complete NTS refinement
    browser.$$('a=Refinement')[1].click()
    completeRichTextField(browser, 'nts-refinement');
    browser
      .click('button=Continue')
      .click('button=Continue');

    console.log('Completed NTS refinement');

    // submit application
    waitForSync(browser);
    browser.click('button=Continue');

    browser.click('label[for="awerb-notyet"]');
    browser.click('label[for="ready-no"]');

    browser.click('button=Submit PPL application');

    assert.ok(browser.isVisible('h1=Application submitted'));
    console.log('Submitted application');

    browser.url('/');
    browser.click('a=In progress');

    assert.ok(browser.$('a=PPL application').isExisting());
  });

});
