const gotoOutstandingTasks = browser => {
  browser.click('a=In progress');
  browser.waitUntil(() => {
    if (browser.isExisting('table:not(.loading)')) {
      return true;
    }
    if (browser.isExisting('p=You have no tasks in progress')) {
      return true;
    }
    return false;
  });
  browser.click('a=Outstanding');
  browser.waitForExist('table:not(.loading) th a:not(.disabled)');
  browser.click('a=Last changed');
  browser.waitForExist('table:not(.loading) th a:not(.disabled)');
  browser.click('a=Last changed');
  browser.waitForExist('table:not(.loading)');
};

module.exports = gotoOutstandingTasks;
