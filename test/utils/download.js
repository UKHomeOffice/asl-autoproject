const r2 = require('r2');
const pdf = require('pdf-parse');
const assert = require('assert');

const parsePDF = data => pdf(Buffer.from(data, 'binary'));

const downloadFile = (browser, fileType) => {
  const isLicence = browser.isExisting('a=Download licence');

  const selector = isLicence ? 'a=Download licence' : 'a=Download application';

  browser.click(selector);

  const downloadLinks = {
    pdf: 'a=As PDF',
    word: 'a*=As Word'
  };

  const mimeTypes = {
    pdf: 'application/pdf',
    word: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  };

  const url = browser.$(downloadLinks[fileType]).getAttribute('href');
  browser.click(selector); // close it again so we can call this function multiple times

  const allCookies = browser.getCookie();
  const sid = allCookies.find(c => c.name === 'sid').value;
  const headers = { cookie: `sid=${sid}` };

  return browser.call(() => {
    return r2(url, { headers }).response
      .then(res => {
        assert.equal(res.status, 200);
        assert.equal(res.headers.get('content-type'), mimeTypes[fileType]);
        return res.buffer();
      })
      .then(data => {
        switch (fileType) {
          case 'pdf':
            return parsePDF(data).then(pdf => pdf.text);
          case 'word':
            return data.toString('utf8');
          default:
            return data;
        }
      });
  });
};

module.exports = {
  downloadFile,
  parsePDF
};
