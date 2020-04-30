const DEFAULT_CHAR_SET = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789'; // No ambiguous Os

const generateCode = function(numberOfChars, charSet = DEFAULT_CHAR_SET) {
  return Array(numberOfChars).fill().map(function() {
    return charSet.charAt(Math.floor(Math.random() * charSet.length));
  }).join('');
};

export default generateCode;
