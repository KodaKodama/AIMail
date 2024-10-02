const sanitizeHtml = require("sanitize-html");

// Function to sanitize and format generated content
function sanitizeContent(text) {
  const cleanText = sanitizeHtml(text, {
    allowedTags: ["p", "b", "i", "em", "strong", "h1", "h2", "h3", "ul", "li"],
    allowedAttributes: {},
  });
  return cleanText.replace(/\n/g, "<br>"); 
}

module.exports = sanitizeContent;
