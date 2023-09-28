const router = require("express").Router();
const { body } = require("express-validator");
const authCtrl = require("../controllers/authCtrl");
const validators = require("../middleware/validators");

router.post(
  "/register",
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password")
      .exists()
      .notEmpty()
      .isLength({ min: 6 }),
    body("fullname", "Fullname missing").exists(),
    body("username", "Invalid username").exists(),
    body("gender", "Please choose gender").exists(),
  ]),
  authCtrl.register
);

router.post(
  "/login",
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
    body("password", "Invalid password").exists().notEmpty(),
  ]),
  authCtrl.login
);

router.post(
  "/logout",

  authCtrl.logout
);

router.post("/refresh_token", authCtrl.generateAccessToken);

router.post(
  "/reset_request",
  validators.validate([
    body("email", "Invalid email")
      .exists()
      .isEmail()
      .normalizeEmail({ gmail_remove_dots: false }),
  ]),
  authCtrl.requestReset
);

router.patch(
  "/reset_password",
  validators.validate([
    body("token", "Expired token").exists(),
    body("password", "Invalid password")
      .exists()
      .notEmpty()
      .isLength({ min: 6 }),
  ]),
  authCtrl.resetPassword
);

router.post(
  "/validate",
  validators.validate([body("token", "Expired token").exists()]),
  authCtrl.checkResetToken
);

module.exports = router;
