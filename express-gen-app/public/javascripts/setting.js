const mongoose = require("mongoose");
const schema = require("./schema")

const setting = {
    db: {
        url: "mongodb://localhost:27017/ROOTINE",
        models: {
            Account: mongoose.model("account", schema.account),
        }
    }
};

module.exports.setting = setting;