const assert = require('assert');

const taskAssertions = browser => {
  assert.ok(browser.$('.procedures-diff').$('li*=Category D competency').isDisplayed());
  assert.ok(browser.$('.procedures-diff').$('li*=Category F type of procedure').isDisplayed());

  ['Mice', 'Rats', 'Jabu', 'Babu'].forEach(type => {
    assert.ok(browser.$('#species').$(`li=${type}`).isDisplayed(), `Expected ${type} to be in species list`);
  });

  const training = browser.$('#training');
  assert.ok(training.$('p*=12345').isDisplayed(), 'Expected certificate number to be displayed');
  assert.ok(training.$('p*=04 June 2015').isDisplayed(), 'Expected date awarded to be displayed');
  assert.ok(training.$('p*=Royal Society of Biology').isDisplayed(), 'Expected awarding body to be displayed');
  assert.ok(training.$('li=PILA (theory)').isDisplayed(), 'Expected PILA (theory) module to be displayed');
  assert.ok(training.$('li=PILB').isDisplayed(), 'Expected PILB module to be displayed');
  assert.ok(training.$('li=Mice').isDisplayed(), 'Expected Mice to be displayed');

  const exemptions = browser.$('#exemptions');
  assert.ok(exemptions.$('dd*=PILA (skills)').isDisplayed(), 'Expected PILA (skills) to be displayed');
  assert.ok(exemptions.$('p*=Cats').isDisplayed(), 'Expected Cats to be displayed');
  assert.ok(exemptions.$('p*=Reptiles').isDisplayed(), 'Expected Reptiles to be displayed');
  assert.ok(exemptions.$('dd=Reason for PILA (skills) exemption').isDisplayed(), 'Expected exemption reason to be displayed');
};

module.exports = {
  taskAssertions
};
