// ../utils/helpers.js

import React from 'react';

function wrapCharactersInSpan(text) {
  // Split the text into an array of characters
  const characters = text.split('');

  // Map each character to a span element
  const wrappedText = characters.map((char, index) => (
    React.createElement('span', { key: index }, char)
  ));

  return wrappedText;
}

module.exports = {
  wrapCharactersInSpan,
};
