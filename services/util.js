const mongoose = require("mongoose")

module.exports = {
    validateObjectId: (id) => mongoose.isValidObjectId(id),
}