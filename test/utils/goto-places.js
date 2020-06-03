module.exports = function () {
  this.url('/');
  this.$('.panel-list').$(`h3=University of Croydon`).click()
  this.$('.expanding-panel.open').$('=View establishment information').click()
  this.$('a=Approved areas').click();
}
