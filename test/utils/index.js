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


const paragraphs = (min = 1, max = 3, fast=false) => {
  const result = [];
  const min_words = fast?1:10;
  const max_words = fast?10:100;
  const len = between(min, max);
  while (result.length < len) {
    result.push(sentence(min_words,max_words));
  }
  return result;
};

module.exports = {
  words,
  sentence,
  paragraphs
};
