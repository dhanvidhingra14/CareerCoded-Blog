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

  const API_URL = "https://careercoded-blog.onrender.com/api";

  const getBlogs = async () => {
    const res = await axios.get(`${API_URL}/blogs`);
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

      const res = await axios.post(`${API_URL}/blogs`, newBlog);

      alert(res.data.message);

      getBlogs();

      setBlogData({
        title: "",
        thumbnail: "",
        description: "",
        content: "",
        author: "",
        category: "",
        tags: ""
      });

    } catch (error) {
      alert("Blog creation failed");
      console.log(error);
    }
  };

  return (
    <div className="app">

      <nav className="navbar">
        <h1>CareerCoded Blog Platform</h1>
        <p>MERN Stack Internship Project</p>
      </nav>

      <section className="form-section">

        <h2>Create Blog</h2>

        <div className="form-grid">

          <input
            name="title"
            placeholder="Blog Title"
            value={blogData.title}
            onChange={handleChange}
          />

          <input
            name="thumbnail"
            placeholder="Thumbnail URL"
            value={blogData.thumbnail}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Short Description"
            value={blogData.description}
            onChange={handleChange}
          />

          <input
            name="author"
            placeholder="Author Name"
            value={blogData.author}
            onChange={handleChange}
          />

          <input
            name="category"
            placeholder="Category"
            value={blogData.category}
            onChange={handleChange}
          />

          <input
            name="tags"
            placeholder="Tags e.g. tech,coding"
            value={blogData.tags}
            onChange={handleChange}
          />

        </div>

        <textarea
          name="content"
          placeholder="Write blog content..."
          value={blogData.content}
          onChange={handleChange}
        ></textarea>

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
                        `${API_URL}/blogs/${blog._id}/like`,
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

                      await axios.put(
                        `${API_URL}/blogs/${blog._id}`,
                        {
                          title: newTitle,
                          description: newDescription
                        }
                      );

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

                      await axios.delete(
                        `${API_URL}/blogs/${blog._id}`
                      );

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