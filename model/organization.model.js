const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const productSchema = require("./product.model").productSchema;

const organizationSchema = new mongoose.Schema({
  orgName: String,
  orgAddress: String,
  orgEmail: String,
  password: String,
  orgProducts: [productSchema],
});

organizationSchema.plugin(passportLocalMongoose);

const Organization = mongoose.model("Organization", organizationSchema);

module.exports = Organization;
// module.exports.organizationSchema = organizationSchema;
