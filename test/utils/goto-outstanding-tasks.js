module.exports = function () {
  this.$('a=In progress').click();
  this.waitUntil(() => {
    if (this.$('table:not(.loading)').isDisplayed()) {
      return true;
    }
    if (this.$('p=You have no tasks in progress').isDisplayed()) {
      return true;
    }
    return false;
  });
  this.$('a=Outstanding').click();
  this.$('table:not(.loading) th a:not(.disabled)').waitForExist();
  this.$('a=Last changed').click();
  this.$('table:not(.loading) th a:not(.disabled)').waitForExist();
  this.$('a=Last changed').click();
  this.$('table:not(.loading)').waitForExist();
};
