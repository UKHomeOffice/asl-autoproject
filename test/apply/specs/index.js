const assert = require('assert');
const { paragraphs } = require('../../utils');

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

describe('PPL Application', () => {

  after(() => new Promise(resolve => setTimeout(resolve, 2000)));

  it('can apply for a PPL', () => {
    browser.withUser('holc');

    browser.url('/');

    browser.click('h3=University of Croydon');
    browser.waitForExist('=View establishment information');
    browser.click('=View establishment information');
    browser.click('a=Projects');

    browser.click('button=Apply for project licence');

    assert.ok(browser.isVisible('h2=Untitled project'));

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
    browser.click('input[name="species"][value="mice"]');
    browser.click('input[name="species"][value="rats"]');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 1);

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

    // complete funding
    browser.click('a=Funding');
    completeRichTextField(browser, 'funding-how');
    browser.click('input[name="funding-basic-translational"][value="true"]');
    completeRichTextField(browser, 'funding-reviewed');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 3);

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

    //complete poles
    browser.click('a=Places other than a licensed establishment (POLEs)');
    browser.click('input[name="poles"][value="true"]');
    completeRichTextField(browser, 'poles-justification');
    browser.$('.control-panel').click('button=Continue');

    browser.$('input[name$="title"]').setValue('First POLE');
    completeRichTextField(browser, 'pole-info');
    browser.$('.control-panel').click('button=Continue');

    completeRichTextField(browser, 'poles-inspection');
    completeRichTextField(browser, 'poles-environment');
    browser.click('input[name="poles-transfer"][value="false"]');
    continueAndComplete(browser);

    assert.equal(browser.$$('.badge.complete').length, 6);

  });

});
