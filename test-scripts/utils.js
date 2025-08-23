/**
 * Sanitizes a string to be used as a valid filename.
 * @param {string} name The string to sanitize.
 * @returns {string} The sanitized string.
 */
function sanitizeForFilename(name) {
  return name.replace(/\s/g, '-').replace(/[>\/]/g, '-').toLowerCase();
}

module.exports = { sanitizeForFilename };
