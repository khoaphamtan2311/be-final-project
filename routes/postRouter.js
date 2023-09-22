const router = require("express").Router();
const postCtrl = require("../controllers/postCtrl");
const validators = require("../middleware/validators");
const auth = require("../middleware/auth");
const { body } = require("express-validator");

router
  .route("/posts")
  .post(
    auth,
    validators.validate([
      body("content", "missing Content").exists().isString(),
    ]),
    postCtrl.createPost
  )
  .get(auth, postCtrl.getPosts);

router
  .route("/post/:id")
  .patch(
    auth,
    validators.validate([
      body("content", "missing Content").exists().isString(),
    ]),
    postCtrl.updatePost
  )
  .get(auth, postCtrl.getPost)
  .delete(auth, postCtrl.deletePost);

router.patch("/post/:id/like", auth, postCtrl.likePost);

router.patch("/post/:id/unlike", auth, postCtrl.unLikePost);

router.get("/user_posts/:id", auth, postCtrl.getUserPosts);

router.get("/post_discover", auth, postCtrl.getPostsDicover);

router.patch("/savePost/:id", auth, postCtrl.savePost);

router.patch("/unSavePost/:id", auth, postCtrl.unSavePost);

router.get("/getSavePosts", auth, postCtrl.getSavePosts);

module.exports = router;
