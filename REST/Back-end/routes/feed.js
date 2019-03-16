const express = require("express");
const { body } = require("express-validator/check");

const router = express.Router();
const controller = require("../controllers/feed");
const isAuth = require("../middleware/is-auth");

router.get("/posts", isAuth, controller.getPosts);
router.post(
  "/post",
  isAuth,
  [
    (body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 }))
  ],
  controller.postPosts
);

router.put(
  "/post/:postId",
  isAuth,
  [
    (body("title")
      .trim()
      .isLength({ min: 5 }),
    body("content")
      .trim()
      .isLength({ min: 5 }))
  ],
  controller.updatePost
);

router.get("/post/:postId", isAuth, controller.getPost);

router.delete("/post/:postId", isAuth, controller.deletePost);

module.exports = router;
