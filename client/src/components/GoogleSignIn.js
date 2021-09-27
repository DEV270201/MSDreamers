import React from 'react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../Icons/GoogleIcon';
import CLIENT_ID from '../config/conf';
import Axios from 'axios';
import { CookiesProvider, Cookies } from 'react-cookie';
import { useCookies } from 'react-cookie';

const GoogleSignIn = () => {
  const [cookie, setCookie] = useCookies(['XSRF-TOKEN']);
  const googleSuccess = async (res) => {
    try {
      await Axios.post('http://localhost:4000/users/googleSignIn', {
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
    console.log('COOKIEEEEEEEEEEEE', cookie);
    const resp = await Axios.post(
      'http://localhost:4000/users/login',
      {
        email: 'priyal.babel@somaiya.edu',
        password: 'priyal',
        securityWord: 'priyal',
      },
      {
        headers: {
          'XSRF-TOKEN': cookie,
        },
      }
    );
    console.log('Response on button click:', resp);
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
        <input type='hidden' name='_csrf' value={cookie}></input>
        <button onClick={Login}>Submit</button>
      </div>
    </CookiesProvider>
  );
};

export default GoogleSignIn;
