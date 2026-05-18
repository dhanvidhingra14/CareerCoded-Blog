import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const API_URL = "https://careercoded-blog.onrender.com/api";

  const [blogs, setBlogs] = useState([]);
  const [role, setRole] = useState("guest");

  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

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
    try {
      const res = await axios.get(`${API_URL}/blogs`);
      setBlogs(res.data);
    } catch (error) {
      alert("Failed to fetch blogs");
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const login = () => {
    if (loginData.email === "admin@gmail.com" && loginData.password === "admin123") {
      setRole("admin");
      alert("Admin Login Successful");
    } else {
      setRole("user");
      alert("User Login Successful");
    }
  };

  const logout = () => {
    setRole("guest");
    setLoginData({
      email: "",
      password: ""
    });
  };

  const handleChange = (e) => {
    setBlogData({
      ...blogData,
      [e.target.name]: e.target.value
    });
  };

  const createBlog = async () => {
    if (!blogData.title || !blogData.description || !blogData.content || !blogData.author || !blogData.category) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const newBlog = {
        ...blogData,
        tags: blogData.tags.split(",")
      };

      const res = await axios.post(`${API_URL}/blogs`, newBlog);
      alert(res.data.message);

      setBlogData({
        title: "",
        thumbnail: "",
        description: "",
        content: "",
        author: "",
        category: "",
        tags: ""
      });

      getBlogs();
    } catch (error) {
      alert("Blog creation failed");
    }
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div>
          <h1>CareerCoded Blogs</h1>
          <p>MERN Stack Blog Management Platform</p>
        </div>

        <div className="nav-links">
          <a href="#blogs">Blogs</a>
          {role === "admin" && <a href="#create">Create Blog</a>}
          {role !== "guest" && <button onClick={logout}>Logout</button>}
        </div>
      </nav>

      <header className="hero">
        <h2>CareerCoded Blog Management System</h2>
        <p>
          Admin can manage blogs. Users can read and like blogs.
        </p>
      </header>

      {role === "guest" && (
        <section className="form-section">
          <h2>Login</h2>

          <div className="form-grid">
            <input
              name="email"
              placeholder="Enter Email"
              value={loginData.email}
              onChange={handleLoginChange}
            />

            <input
              name="password"
              placeholder="Enter Password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
            />
          </div>

          <button className="primary-btn" onClick={login}>
            Login
          </button>

          <p className="hint">
            Admin Login: admin@gmail.com / admin123 <br />
            Any other email/password will login as User.
          </p>
        </section>
      )}

      {role === "admin" && (
        <section className="form-section" id="create">
          <h2>Admin Panel - Create Blog</h2>

          <div className="form-grid">
            <input name="title" placeholder="Blog Title *" value={blogData.title} onChange={handleChange} />

            <input name="thumbnail" placeholder="Thumbnail Image URL" value={blogData.thumbnail} onChange={handleChange} />

            <input name="description" placeholder="Short Description *" value={blogData.description} onChange={handleChange} />

            <input name="author" placeholder="Author Name *" value={blogData.author} onChange={handleChange} />

            <input name="category" placeholder="Category *" value={blogData.category} onChange={handleChange} />

            <input name="tags" placeholder="Tags e.g. tech,coding" value={blogData.tags} onChange={handleChange} />
          </div>

          <textarea
            name="content"
            placeholder="Write blog content *"
            value={blogData.content}
            onChange={handleChange}
          ></textarea>

          <button className="primary-btn" onClick={createBlog}>
            Create Blog
          </button>
        </section>
      )}

      <section className="blogs-section" id="blogs">
        <h2>All Blogs</h2>

        {role === "guest" && (
          <p className="empty-text">Please login as Admin or User to interact with blogs.</p>
        )}

        {blogs.length === 0 ? (
          <p className="empty-text">No blogs available. Admin can create blogs.</p>
        ) : (
          <div className="blogs-grid">
            {blogs.map((blog) => (
              <div className="blog-card" key={blog._id}>
                <img
                  src={blog.thumbnail || "https://via.placeholder.com/500x300?text=CareerCoded+Blog"}
                  alt={blog.title}
                />

                <div className="card-content">
                  <span className="category">{blog.category}</span>

                  <h3>{blog.title}</h3>

                  <p className="description">{blog.description}</p>

                  <p className="content">{blog.content}</p>

                  <div className="blog-info">
                    <span>Author: {blog.author}</span>
                    <span>Likes: {blog.likes.length}</span>
                  </div>

                  {role !== "guest" && (
                    <div className="buttons">
                      <button
                        className="like-btn"
                        onClick={async () => {
                          const userId = prompt("Enter your User ID");

                          try {
                            await axios.put(`${API_URL}/blogs/${blog._id}/like`, {
                              userId
                            });

                            getBlogs();
                          } catch (error) {
                            alert("Like failed");
                          }
                        }}
                      >
                        Like
                      </button>

                      {role === "admin" && (
                        <>
                          <button
                            className="update-btn"
                            onClick={async () => {
                              const newTitle = prompt("Enter new title");
                              const newDescription = prompt("Enter new description");

                              try {
                                await axios.put(`${API_URL}/blogs/${blog._id}`, {
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
                                await axios.delete(`${API_URL}/blogs/${blog._id}`);
                                alert("Blog Deleted");
                                getBlogs();
                              } catch (error) {
                                alert("Delete failed");
                              }
                            }}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>Developed by Dhanvi Dhingra | CareerCoded Internship Project</p>
      </footer>
    </div>
  );
}

export default App;