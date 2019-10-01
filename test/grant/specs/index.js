describe('PPL Grant', () => {

  it('can grant a PPL', () => {
    browser.withUser('licensing');

    browser.click('a=In progress');
    browser.waitForExist('table:not(.loading)');
    browser.click('a=Outstanding');
    browser.waitForExist('table:not(.loading)');
    browser.click('a=Last changed');
    browser.waitForExist('table:not(.loading)');
    browser.click('a=Last changed');
    browser.waitForExist('table:not(.loading)');

    // find task in task list
    assert.ok(browser.isVisible(`[title=${process.env.PROJECT_TITLE}]`));
    console.log('Found task for project');
    browser.$(`[title=${process.env.PROJECT_TITLE}]`).click('a=PPL application');

    browser.click('a=View latest submission');

    browser.click('a=Introductory details');

    assert.ok(browser.isVisible(`p=${process.env.PROJECT_TITLE}`), 'Project title should be visible on introductory details review page');
    console.log('Reviewed project');

    browser.click('a=Next steps');

    browser.click('input[name="status"][value="resolved"]');

    browser.click('button=Continue');

    browser.click('button=Recommend for approval');

    assert.ok(browser.isVisible('h1=Licence granted'));
    console.log('Recommended application');

  });

});

  });

});
