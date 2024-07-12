// utils/logger.js

const formatDate = (date) => {
  return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
};

const logWithTimestamp = (method, ...args) => {
  method(`[${formatDate(new Date())}]`, ...args);
};

// Save the original methods so we can use them internally
console.originalLog = console.log;
console.originalInfo = console.info;
console.originalWarn = console.warn;
console.originalError = console.error;

console.log = (...args) => logWithTimestamp(console.originalLog, ...args);
console.info = (...args) => logWithTimestamp(console.originalInfo, ...args);
console.warn = (...args) => logWithTimestamp(console.originalWarn, ...args);
console.error = (...args) => logWithTimestamp(console.originalError, ...args);

module.exports = console;
