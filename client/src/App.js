import Landing from './components/Landing';
import Register from './components/Register';
import GoogleRegister from './components/GoogleRegister';
import Login from './components/Login';
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
        <Route component={GoogleRegister} path="/googleRegister" />
        <Route component={Login} path="/login" />
          <Redirect to="/" />
      </Switch>
      <Navbar/>
    </>
  );
}

export default App;
