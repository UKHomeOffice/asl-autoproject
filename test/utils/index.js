const fs = require('fs');
const path = require('path');
const { sampleSize } = require('lodash');

const corpus = fs.readFileSync(path.resolve(__dirname, '../../text.txt')).toString('utf8').split(/\W/).filter(Boolean);

const between = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const words = n => {
  return sampleSize(corpus, n).join(' ');
};

const sentence = (min = 10, max = 100) => {
  const txt = words(between(min, max)) + '.';
  return txt.replace(/^\w/, c => c.toUpperCase()) + '\n';
};

const paragraphs = (min = 1, max = 5) => {
  const result = [];
  const len = between(min, max);
  while (result.length < len) {
    result.push(sentence(10,100));
  }
  return result;
};

module.exports = {
  words,
  sentence,
  paragraphs
};
