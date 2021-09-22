import React, { useEffect } from 'react';
import { Button } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import GoogleIcon from '../Icons/GoogleIcon';
import CLIENT_ID from '../config/conf';
import Axios from 'axios';

const GoogleSignIn = () => {
  useEffect(() => {
    console.log('Use effect is working!!!!!!!!!!!');
    async function newFunc() {
      const resp = await Axios.get(
        'https://www.googleapis.com/drive/v3/files/1bBAQngEK9dX6_CX13WgFUVbbB2ov38cN'
      );
      console.log('Responseeeeeeeeeeeeee: ', resp);
    }
    newFunc();
  });

  const googleSuccess = async (res) => {
    // console.log(res)
    try {
      const resp = await Axios.post(
        'http://localhost:4000/users/googleSignIn',
        { token: res.tokenId }
      );
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
    console.log('Sign in unsuccessful!');
  };

  return (
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
  );
};

export default GoogleSignIn;
