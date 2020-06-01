const assert = require('assert');

describe('PPL Recommendation', () => {

  it('can recommend a PPL', () => {
    browser.withUser('inspector');

    browser.gotoOutstandingTasks();

    // find task in task list
    assert.ok(browser.$(`[title="${process.env.PROJECT_TITLE}"]`).isDisplayed());
    console.log('Found task for project');
    browser.$(`[title="${process.env.PROJECT_TITLE}"]`).$('a=PPL application').click();

    // extend deadline
    browser.$('a=Extend deadline').click();
    browser.$('textarea[name="comment"]').setValue('Reason for extending deadline');
    browser.$('button=Extend deadline').click();
    assert.equal(browser.$('.activity-log').$('span.badge').getText(), 'DEADLINE EXTENDED');
    assert.ok(browser.$('p=Reason for extending deadline').isDisplayed());
    console.log('Extended deadline');

    browser.$('a=View latest submission').click();

    browser.$('a=Introductory details').click();

    assert.ok(browser.$(`p=${process.env.PROJECT_TITLE}`).isDisplayed(), 'Project title should be visible on introductory details review page');
    console.log('Reviewed project');

    // complete conditions
    browser.$('h3=Additional conditions').click();
    browser.$('a=Additional conditions').click();
    [
      'Marmosets',
      'Animals taken from the wild',
      'Feral animals',
      'POLEs',
      'Non purpose bred schedule 2 animals',
      'Establishment licences not meeting Code of Practice'
    ].forEach(condition => {
      assert.ok(browser.$(`h3=${condition}`).isDisplayed(), `Condition "${condition}" should be visible`);
    });

    // Animals taken from the wild
    browser.$('.wild').$('button=Edit').click();
    const textarea = browser.$('textarea');
    const value = textarea.getValue();
    textarea.setValue(value.replace('<<<INSERT animal type(s) HERE>>>', 'mice'));
    browser.$('button=Save').click();

    browser.waitForSync();
    console.log('Updated animals taken from the wild condition')

    // Feral animals
    browser.$('.feral').$('button=Remove').click();

    browser.waitForSync();
    console.log('Removed feral animals condition');

    browser.$('button=Add more additional conditions').click();
    browser.$('input[name="conditions"][value="batch-testing"]').click();
    browser.$('button=Confirm').click();

    browser.waitForSync();
    console.log('Added batch testing condition');

    // protocol conditions
    browser.$('h3=Protocols').click();
    browser.$('a=Protocols').click();
    browser.$$('section.protocol')[0].click();
    let protocol = browser.$$('section.protocol')[0];
    protocol.$('h3=Additional conditions').click();
    assert.ok(browser.$('h3=POLEs').isDisplayed());

    // add custom condition
    browser.$('button=Add another additional condition').click();
    browser.$('textarea').setValue('Custom condition protocol 1');
    browser.$('button=Save').click();
    console.log('custom condition added to first protocol');

    browser.$$('section.protocol')[0].$('h3=Authorisations').click();
    [
      'Re-use',
      'Continued use on to a protocol',
      'Continued use off a protocol on to another protocol in this project',
      'Continued use off protocol on to another project'
    ].forEach(authorisation => {
      assert.ok(browser.$(`h3=${authorisation}`).isDisplayed(), `Authorisation "${authorisation}" should be visible`);
    });

    browser.waitForSync();
    browser.$('a=Next steps').click();

    browser.$('input[name="status"][value="inspector-recommended"]').click();

    browser.$('button=Continue').click();

    browser.$('button=Recommend for approval').click();

    assert.ok(browser.$('h1=Recommendation sent').isDisplayed());
    console.log('Recommended application');

  });

});
