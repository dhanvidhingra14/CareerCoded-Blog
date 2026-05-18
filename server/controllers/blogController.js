const Blog = require("../models/Blog");

// CREATE BLOG
const createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      message: "Blog Created Successfully",
      blog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL BLOGS
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE BLOG
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE BLOG
const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json({
      message: "Blog Updated Successfully",
      blog
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE BLOG
const deleteBlog = async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Blog Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// LIKE BLOG

const likeBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    if (!blog.likes.includes(req.body.userId)) {

      blog.likes.push(req.body.userId);

      await blog.save();
    }

    res.status(200).json({
      message: "Blog Liked",
      totalLikes: blog.likes.length
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};



// UNLIKE BLOG

const unlikeBlog = async (req, res) => {

  try {

    const blog = await Blog.findById(req.params.id);

    blog.likes = blog.likes.filter(
      (id) => id.toString() !== req.body.userId
    );

    await blog.save();

    res.status(200).json({
      message: "Blog Unliked",
      totalLikes: blog.likes.length
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  likeBlog,
  unlikeBlog
};