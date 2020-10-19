const router = require("express").Router();
const passport = require("passport");
const Organization = require("../model/organization.model");
const Product = require("../model/product.model").Product;

const findOrgName = (organization) => {
  Organization.findOne({ orgName: organization }).exec();
};
const findOrgProducts = (orgName) => {
  return Product.find({ organization: orgName }).exec();
};

router.route("/").get((req, res) => {
  Organization.find({})
    .then((organization) => res.send(organization))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:organization").get((req, res) => {
  const organization = req.params.organization;
  Organization.find({ organization })
    .then((organization) => res.send(organization))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/register").post((req, res) => {
  const orgName = req.body.orgName;

  if (findOrgName(orgName) === null) {

    const orgAddress = req.body.orgAddress;
    const orgEmail = req.body.orgEmail;
    const orgProducts = findOrgProducts(orgName);

    const data = { orgName, orgAddress, orgEmail, orgProducts };
    Organization.create(data)
      .then(() => res.json("Organization added!"))
      .catch((err) => res.status(400).json("Error: " + err));
  } else {
    res.send("Organization exists already.");
  }
});

module.exports = router;
