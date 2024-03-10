const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * アカウント情報のスキーマ
 * @property {string} userId
 * @property {string} password
 */
const account = new Schema({
    userId: String,
    password: String
});

module.exports = {
    account: account
}