import React from 'react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../Icons/GoogleIcon';
import CLIENT_ID from '../config/conf';
import axios from 'axios';
import { CookiesProvider, Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';

axios.defaults.withCredentials = true;
const GoogleSignIn = () => {
  const [cookie, setCookie] = useCookies(['csrftoken']);
  const googleSuccess = async (res) => {
    try {
      await axios.post('http://localhost:4000/users/googleSignIn', {
        token: res.tokenId,
      });
      // console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log('Sign in unsuccessful!');
  };

  const Login = async () => {
    // Axios.defaults.withCredentials = true;
    const resp = await axios.post(
      'http://localhost:4000/users/login',
      {
        email: 'priyal.babel@somaiya.edu',
        password: 'priyal',
        securityWord: 'priyal',
      },
      {
        withCredentials: true,
      }
    );
    console.log(resp);
    // const resp1 = await fetch('http://localhost:4000/users/login', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     email: 'priyal.babel@somaiya.edu',
    //     password: 'priyal',
    //     securityWord: 'priyal',
    //   }),
    // });
    // console.log('Response on button click:', await resp1.json());
    // console.log('COOKIEEEEEEEEEEEE', cookie);
  };

  return (
    <CookiesProvider>
      <GoogleLogin
        clientId={CLIENT_ID}
        render={(renderProps) => (
          <Button
            color='primary'
            fullWidth
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<GoogleIcon />}
            variant='contained'
          >
            Google Sign In
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
        cookiePolicy={'single_host_origin'}
      />
      <div>
        {/* <input type='hidden' name='_csrf' value={cookie}></input> */}
        <button onClick={Login}>Submit</button>
      </div>
    </CookiesProvider>
  );
};

export default GoogleSignIn;
