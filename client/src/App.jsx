import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [blogs, setBlogs] = useState([]);

  const [blogData, setBlogData] = useState({
    title: "",
    thumbnail: "",
    description: "",
    content: "",
    author: "",
    category: "",
    tags: ""
  });

  const getBlogs = async () => {
    const res = await axios.get("http://localhost:5000/api/blogs");
    setBlogs(res.data);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value
    });
  };

  const createBlog = async () => {
    try {
      const newBlog = {
        ...blogData,
        tags: blogData.tags.split(",")
      };

      const res = await axios.post("http://localhost:5000/api/blogs", newBlog);
      alert(res.data.message);
      getBlogs();
    } catch (error) {
      alert("Blog creation failed");
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <h1>CareerCoded Blogs</h1>
        <p>Blog Management Platform</p>
      </nav>

      <section className="form-section">
        <h2>Create Blog</h2>

        <div className="form-grid">
          <input name="title" placeholder="Blog Title" onChange={handleChange} />
          <input name="thumbnail" placeholder="Thumbnail URL" onChange={handleChange} />
          <input name="description" placeholder="Short Description" onChange={handleChange} />
          <input name="author" placeholder="Author Name" onChange={handleChange} />
          <input name="category" placeholder="Category" onChange={handleChange} />
          <input name="tags" placeholder="Tags e.g. tech,coding" onChange={handleChange} />
        </div>

        <textarea name="content" placeholder="Write blog content..." onChange={handleChange}></textarea>

        <button className="primary-btn" onClick={createBlog}>
          Create Blog
        </button>
      </section>

      <section className="blogs-section">
        <h2>All Blogs</h2>

        <div className="blogs-grid">
          {blogs.map((blog) => (
            <div className="blog-card" key={blog._id}>
              {blog.thumbnail && (
                <img src={blog.thumbnail} alt={blog.title} />
              )}

              <h3>{blog.title}</h3>
              <p className="description">{blog.description}</p>
              <p>{blog.content}</p>

              <div className="blog-info">
                <span>Author: {blog.author}</span>
                <span>Category: {blog.category}</span>
                <span>Likes: {blog.likes.length}</span>
              </div>

              <div className="buttons">
                <button
                  className="like-btn"
                  onClick={async () => {
                    const userId = prompt("Enter your User ID");

                    try {
                      await axios.put(
                        `http://localhost:5000/api/blogs/${blog._id}/like`,
                        { userId }
                      );
                      getBlogs();
                    } catch (error) {
                      alert("Like failed");
                    }
                  }}
                >
                  Like
                </button>

                <button
                  className="update-btn"
                  onClick={async () => {
                    const newTitle = prompt("Enter new title");
                    const newDescription = prompt("Enter new description");

                    try {
                      await axios.put(`http://localhost:5000/api/blogs/${blog._id}`, {
                        title: newTitle,
                        description: newDescription
                      });

                      alert("Blog Updated");
                      getBlogs();
                    } catch (error) {
                      alert("Update failed");
                    }
                  }}
                >
                  Update
                </button>

                <button
                  className="delete-btn"
                  onClick={async () => {
                    try {
                      await axios.delete(`http://localhost:5000/api/blogs/${blog._id}`);
                      alert("Blog Deleted");
                      getBlogs();
                    } catch (error) {
                      alert("Delete failed");
                    }
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;