const assert = require('assert');
const gotoOutstandingTasks = require('../../../utils/goto-outstanding-tasks');
const { waitForSync } = require('../../../utils');

describe('PPL Recommendation', () => {

  it('can recommend a PPL', () => {
    browser.timeouts('implicit', 2000);
    browser.withUser('inspector');

    gotoOutstandingTasks(browser);

    // find task in task list
    assert.ok(browser.isVisible(`[title="${process.env.PROJECT_TITLE}"]`));
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).click('a=PPL application');

    browser.click('a=View latest submission');

    browser.click('a=Introductory details');

    assert.ok(browser.isVisible(`p=${process.env.PROJECT_TITLE}`), 'Project title should be visible on introductory details review page');
    console.log('Reviewed project');

    // complete conditions
    browser.click('h3=Additional conditions');
    browser.click('a=Additional conditions');
    browser.pause(2000);
    [
      'Marmosets',
      'Animals taken from the wild',
      'Feral animals',
      'POLEs',
      'Non purpose bred schedule 2 animals',
      'Establishment licences not meeting Code of Practice'
    ].forEach(condition => {
      assert.ok(browser.$(`h3=${condition}`).isExisting(), `Condition "${condition}" should be visible`);
    });

    // Animals taken from the wild
    browser.$$('button=Edit')[1].click();
    const textarea = browser.$('textarea');
    const value = textarea.getValue();
    textarea.setValue(value.replace('<<<INSERT animal type(s) HERE>>>', 'mice'));
    browser.click('button=Save');

    waitForSync(browser);
    console.log('Updated animals taken from the wild condition')

    // Feral animals
    browser.$$('button=Remove')[2].click();

    waitForSync(browser);
    console.log('Removed feral animals condition');

    browser.click('button=Add more additional conditions');
    browser.click('input[name="conditions"][value="batch-testing"]');
    browser.click('button=Confirm');

    waitForSync(browser);
    console.log('Added batch testing condition');

    // protocol conditions
    browser.click('h3=Protocols');
    browser.click('a=Protocols');
    browser.$$('section.protocol')[0].click();
    let protocol = browser.$$('section.protocol')[0];
    protocol.click('h3=Additional conditions');
    assert.ok(browser.$('h3=Neuromuscular blocking agents (NMBAs)').isExisting());
    assert.ok(browser.$('h3=POLEs').isExisting());

    // add custom condition
    browser.click('button=Add another additional condition');
    browser.setValue('textarea', 'Custom condition protocol 1');
    browser.click('button=Save');
    console.log('custom condition added to first protocol');

    browser.$$('section.protocol')[0].click('h3=Authorisations');
    [
      'Re-use',
      'Continued use on to a protocol',
      'Continued use off a protocol on to another in this project',
      'Continued use off protocol on to another project'
    ].forEach(authorisation => {
      assert.ok(browser.$(`h3=${authorisation}`).isExisting(), `Authorisation "${condition}" should be visible`);
    });

    waitForSync(browser);
    browser.click('a=Next steps');

    browser.click('input[name="status"][value="inspector-recommended"]');

    browser.click('button=Continue');

    browser.click('button=Recommend for approval');

    assert.ok(browser.isVisible('h1=Recommendation sent'));
    console.log('Recommended application');

  });

});
