import React from 'react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../Icons/GoogleIcon';
import CLIENT_ID from '../config/conf';
import Axios from 'axios';

const GoogleSignIn = () => {
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

  return (
    <div>
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
      {/* <input type='hidden' name='_csrf' value=></input> */}
    </div>
  );
};

export default GoogleSignIn;
