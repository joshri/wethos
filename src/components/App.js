import "../styles/main.scss";
import { useSelector } from "react-redux";
import Account from "./Account/Account";
import Home from "./Home/Home";
import { Route, Switch, Redirect } from "react-router";

function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <Switch>
      <Route exact path="/">
        {user ? <Home /> : <Redirect to={{ pathname: "account" }} />}
      </Route>
      <Route path="/account">
        <Account />
      </Route>
    </Switch>
  );
}

export default App;
