import SignIn from "./components/signin";
import "./app_styles.css";
import SignUp from "./components/signup";
import Blog from "./components/blog";
import BlogsHome from "./components/blogshome";
import CreatePost from "./components/createpost";
import { Route, Routes } from "react-router-dom";
import EditBlog from "./components/editblog";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/blogs" element={<BlogsHome />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/edit-post/:id" element={<EditBlog />} />
      </Routes>
    </div>
  );
};

export default App;
