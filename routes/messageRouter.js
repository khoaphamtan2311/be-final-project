const router = require("express").Router();
const { body } = require("express-validator");
const messageCtrl = require("../controllers/messageCtrl");
const auth = require("../middleware/auth");
const validators = require("../middleware/validators");

router.post(
  "/message",
  auth,
  validators.validate([
    body("sender", "invalid user")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
    body("recipient", "invalid user")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
    body("text", "Missing Text").exists().isString(),
  ]),
  messageCtrl.createMessage
);

router.get("/conversations", auth, messageCtrl.getConversations);

router.get("/message/:id", auth, messageCtrl.getMessages);

router.delete("/message/:id", auth, messageCtrl.deleteMessages);

router.delete("/conversation/:id", auth, messageCtrl.deleteConversation);

module.exports = router;
