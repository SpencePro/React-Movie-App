import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Home } from "./home";
import { SingleMovie } from "./single-movie";
import { Watchlist } from "./watchlist";
import { Error } from "./error";
import { RatedMovies } from './rated-movies';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/movie/:id" children={<SingleMovie/>}>
          </Route>
          <Route exact path="/watchlist">
            <Watchlist />
          </Route>
          <Route exact path="/rated_movies">
            <RatedMovies />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
