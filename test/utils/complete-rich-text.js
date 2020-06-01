const { paragraphs } = require('./index');

module.exports = function () {
  // If the fast flag is set fill in a lot less text
  const value = process.env.FAST ? paragraphs(1, 2, { words: [5, 10] }) : paragraphs();
  this.click();
  value.forEach(v => this.keys(v));
};
