import Landing from './components/Landing';
import Register from './components/Register';
import GoogleRegister from './components/GoogleRegister';
import Login from './components/Login';
import {Switch,Route,Redirect} from "react-router-dom";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ForgotPassword from './components/ForgotPassword';
import About from "./components/About";
import ResetPassword from './components/ResetPassword';
import VerifyAccount from './components/VerifyAccount';

function App() {
  return (
    <>
     <Navbar/>
      <Switch>
        <Route component={Landing} path="/" exact />
        {/* <Route component={} path="/forum" />
        <Route component={} path="/resources" /> */}
        <Route component={Register} path="/register" />
        <Route component={GoogleRegister} path="/googleRegister" />
        <Route component={Login} path="/login" />
        <Route component={ForgotPassword} path="/forgotPassword" />
        <Route component={About} path="/about" />
        <Route component={ResetPassword} path="/resetPassword/:token" />
        <Route component={VerifyAccount} path="/verifyAccount/:token"/>
        <Redirect to="/" />
      </Switch>
      <Footer/>
    </>
  );
}

export default App;
