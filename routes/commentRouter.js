const router = require("express").Router();
const { body, param } = require("express-validator");
const commentCtrl = require("../controllers/commentCtrl");
const auth = require("../middleware/auth");
const validators = require("../middleware/validators");

router.post(
  "/comment",
  auth,
  validators.validate([
    body("postId", "Invalid postId")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
    body("postUserId", "Invalid postUserId")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
    body("content", "Missing Content").exists(),
  ]),
  commentCtrl.createComment
);

router.patch(
  "/comment/:id",
  auth,
  validators.validate([
    body("content", "Missing Content").exists(),
    param("id", "Invalid Id")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
  ]),
  commentCtrl.updateComment
);

router.patch(
  "/comment/:id/like",
  auth,
  validators.validate([
    param("id", "Invalid Id")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
  ]),
  commentCtrl.likeComment
);

router.patch(
  "/comment/:id/unlike",
  auth,
  validators.validate([
    param("id", "Invalid Id")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
  ]),
  commentCtrl.unLikeComment
);

router.delete(
  "/comment/:id",
  auth,
  validators.validate([
    param("id", "Invalid Id")
      .exists()
      .isString()
      .custom(validators.checkObjectId),
  ]),
  commentCtrl.deleteComment
);

module.exports = router;
