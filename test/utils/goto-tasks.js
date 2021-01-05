module.exports = (type = 'Outstanding') => function () {
  const latestLabel = type === 'Completed' ? 'Completed' : 'Last changed';
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
  this.$(`a=${type}`).click();
  this.$('table:not(.loading) th a:not(.disabled)').waitForExist();
  if (this.$(`th=${latestLabel}`).getAttribute('aria-sort') === 'ascending') {
    this.$('th').$(`a=${latestLabel}`).click();
    this.$('table:not(.loading)').waitForExist();
  }
};
