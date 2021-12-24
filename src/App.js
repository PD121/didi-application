/* STYLES */
import './App.css';

/* PAGES */
import Home from './pages/Home/Home';
import Blogs from './pages/Blogs/Blogs';
import Images from './pages/Images/Images';
import Videos from './pages/Videos/Videos';
import Contact from './pages/Contact/Contact';
import BlogDetails from './pages/BlogDetails/BlogDetails';
import AddBlog from './pages/AddBlog/AddBlog';



/* COMPONENTS */
import Cover from './components/Cover/Cover';
import Footer from './components/Footer/Footer';

/* OTHER */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Redirect from './components/Redirect/Redirect';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';

import { useAuthContext } from './hooks/useAuthContext'



function App() {
  const { authIsReady } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
      <BrowserRouter>
        
        <Cover />

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/images">
            <Images />
          </Route>

          <Route path="/videos">
            <Videos />
          </Route>

          <Route exact path="/blogs">
            <Blogs />
          </Route>

          <Route path="/blogs/:id">
            <BlogDetails />
          </Route>

          <Route path="/addblog">
            <AddBlog />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/admin">
            <Login />
          </Route>

          <Route path="*">
            <Redirect />
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
      )}
    </div>
  );
}

export default App;
