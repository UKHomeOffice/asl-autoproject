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

const sentence = (min = 10, max = 60, newline = true) => {
  const txt = words(between(min, max)) + '.';
  return txt.replace(/^\w/, c => c.toUpperCase()) + (newline ? '\n' : '');
};


const paragraphs = (min = 1, max = 3, { words } = {}) => {
  words = words || [];
  const result = [];
  const minWords = words[0] || 10;
  const maxWords = words[1] || 100;
  const len = between(min, max);
  while (result.length < len) {
    result.push(sentence(minWords, maxWords));
  }
  return result;
}

const protocolTitles = new Array(10).fill(words(between(3, 7)));

module.exports = {
  words,
  sentence,
  paragraphs,
  protocolTitles
};
