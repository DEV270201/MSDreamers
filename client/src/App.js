import Landing from './components/Landing';
import {Switch,Route,Redirect} from "react-router-dom";

function App() {
  return (
    <>
      <Switch>
          <Route component={Landing} path="/" exact />
          <Route component={Landing} path="/about" />
          {/* <Route component={} path="/forum" />
          <Route component={} path="/resources" />
          <Route component={} path="/register" />
          <Route component={} path="/login" /> */}
          <Redirect to="/" />
      </Switch>
    </>
  );
}

export default App;
