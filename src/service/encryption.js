const bcrypt = require('bcryptjs');

exports.encrypt = (text) => {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
};
