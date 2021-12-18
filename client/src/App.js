import Landing from './components/Landing';
import Register from './components/Register';
import {Switch,Route,Redirect} from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Switch>
          <Route component={Landing} path="/" exact />
          <Route component={Landing} path="/about" />
          {/* <Route component={} path="/forum" />
          <Route component={} path="/resources" />
        <Route component={} path="/login" /> */}
        <Route component={Register} path="/register" />
          <Redirect to="/" />
      </Switch>
      <Navbar/>
    </>
  );
}

export default App;
