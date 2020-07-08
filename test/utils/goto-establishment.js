module.exports = function () {
  this.url('/');

  if (this.$('.expanding-panel.open').isDisplayed()) {
    return this.$('.expanding-panel.open').$('a=Go to University of Croydon').click();
  }

  this.$('.panel-list').$(`h3=University of Croydon`).click();
  this.$('.expanding-panel.open').$('a=Go to University of Croydon').click();
};
