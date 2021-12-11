import './App.css';
import Cover from './components/Cover';
import Footer from './components/Footer';
import Home from './components/Home';
import Blogs from './components/Blogs';
import Images from './components/Images';
import Videos from './components/Videos';


import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contact from './components/Contact';



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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

          <Route path="/blogs">
            <Blogs />
          </Route>

          <Route path="/contact">
            <Contact />
          </Route>
        </Switch>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
