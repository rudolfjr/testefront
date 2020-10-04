import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import Trending from "./pages/Trending";
import Movie from "./pages/Movie";
import Serie from "./pages/Serie";
import Discover from "./pages/Discover";
import Genre from "./pages/Genre";
import List from "./pages/List";
import Search from "./pages/Search";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/trending" exact component={Trending} />
        <Route path="/discover" exact component={Discover} />
        <Route path="/genres" exact component={Genre} />
        <Route path="/movie/:id" exact component={Movie} />
        <Route path="/tv/:id" exact component={Serie} />
        <Route path="/search/:titulo" exact component={Search} />
        <Route path="/genre/:id/:category" exact component={List} />
      </Switch>
    </BrowserRouter>
  );
}
