const assert = require('assert');

describe('PPL Application', () => {

  it('can grant a PPL', () => {
    browser.withUser('licensing');
  });

});
