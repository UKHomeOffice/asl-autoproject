const assert = require('assert');

const taskAssertions = browser => {
  assert.ok(browser.$('dd=Category D competency').isExisting());
  assert.ok(browser.$('dd=Category F type of procedure').isExisting());

  ['Mice', 'Rats', 'Jabu', 'Babu'].forEach(type => {
    assert.ok(browser.$('#species').$(`p=${type}`).isExisting(), `Expected ${type} to be in species list`);
  });

  const training = browser.$('#training');
  assert.ok(training.$('p*=12345').isExisting(), 'Expected certificate number to be displayed');
  assert.ok(training.$('p*=01/01/1999').isExisting(), 'Expected date awarded to be displayed');
  assert.ok(training.$('p*=Royal Society of Biology').isExisting(), 'Expected date awarded to be displayed');
  assert.ok(training.$('li=PILA (theory)').isExisting(), 'Expected PILA (theory) module to be displayed');
  assert.ok(training.$('li=PILB').isExisting(), 'Expected PILB module to be displayed');
  assert.ok(training.$('li=Mice').isExisting(), 'Expected Mice to be displayed');

  const exemptions = browser.$('#exemptions');
  assert.ok(exemptions.$('dd*=PILA (skills)').isExisting(), 'Expected PILA (skills) to be displayed');
  assert.ok(exemptions.$('p*=Cats').isExisting(), 'Expected Cats to be displayed');
  assert.ok(exemptions.$('p*=Reptiles').isExisting(), 'Expected Reptiles to be displayed');
  assert.ok(exemptions.$('dd=Reason for PILA (skills) exemption').isExisting(), 'Expected exemption reason to be displayed');
};

module.exports = {
  taskAssertions
};
