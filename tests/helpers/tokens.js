const jwt = require('jsonwebtoken');

function getAuthHeader(userId, option = {}) {
  const accessToken = jwt.sign({
    id: userId,
  }, process.env.SECRET, option);

  return `Bearer ${accessToken}`;
}

module.exports = getAuthHeader;
