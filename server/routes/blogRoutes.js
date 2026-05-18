const express = require("express");

const {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog
} = require("../controllers/blogController");
const router = express.Router();

router.post("/", createBlog);

router.get("/", getBlogs);

router.get("/:id", getSingleBlog);

router.put("/:id", updateBlog);

router.delete("/:id", deleteBlog);

module.exports = router;
router.put("/:id/like", likeBlog);

router.put("/:id/unlike", unlikeBlog);