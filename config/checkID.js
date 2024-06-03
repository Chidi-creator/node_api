const mongoose = require("mongoose");

const checkId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

module.exports = { checkId };
