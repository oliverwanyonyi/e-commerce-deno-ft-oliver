const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userControllers");

// @api endpoint /api/users/register
// @access public
router.route("/register").post(register);
router.route("/").get((req, res) => res.send("apis are working men"));
// @api endpoint /api/users/login
// @access public
router.route("/login").post(login);

module.exports = router;
