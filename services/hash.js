const bcrypt = require('bcrypt');

async function encrypt(str) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(str, salt);
}

module.exports = encrypt;