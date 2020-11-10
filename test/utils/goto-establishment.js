module.exports = function (establishment = 'University of Croydon') {
  this.url('/');

  if (this.$('.expanding-panel.open').isDisplayed()) {
    return this.$('.expanding-panel.open').$(`a=Go to ${establishment}`).click();
  }

  this.$('.panel-list').$(`h3=${establishment}`).click();
  this.$('.expanding-panel.open').$(`a=Go to ${establishment}`).click();
};
