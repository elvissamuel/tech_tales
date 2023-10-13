import { useSelector } from 'react-redux';
import DisplayBlog from './components/DisplayBlog';
import Nav from './components/Nav';
import PostContent from './components/PostContent';
import CreatePost from './components/cms/CreatePost';
import Dashboard from './components/cms/Dashboard';
import Login from './components/cms/Login';
import Register from './components/cms/Register';
import data from './data.json'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from './components/Footer';

// import img1 from "/assets/imgs/blogimg1.jpg"
function App() {
  const db = useSelector((state)=> state.db.value)

  return (
    <Router>
      <div className="font-lato w-[99%] lg:w-4/5 xl:w-[85%] mx-auto">
        <Nav />
        <Routes>
          <Route path='/' element={<DisplayBlog />} />
          <Route path='/register' element={<Register />} />
          <Route path='/newpost' element={<CreatePost />} />
          <Route path='/admin' element={ <Dashboard />} />
          <Route path='/login' element = {<Login />} />
          <Route path='/newpost' element={<CreatePost />} />
          {db.map((post, index) => { return (<Route key={index} path={`/post/${post.id}`} element={<PostContent post={post}  />} />)})}
          {/* <DisplayBlog /> */}
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
