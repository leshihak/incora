import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Users from "./components/Users";
import UserPosts from "./components/UserPosts";
import Post from "./components/Post";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact>
        <Redirect to="/users" />
      </Route>
      <Route path="/users" exact component={Users} />
      <Route path="/users/:id/posts/:postId" component={Post} />
      <Route path="/users/:id" exact component={UserPosts} />
    </Switch>
  );
};

export default App;
