import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { SpinnerInfinity } from 'spinners-react';

function VerifyAccount(props) {
  let history = useHistory();

  useEffect(() => {

    const req = async () => {
      try {
        const resp = await axios.get(`/users/verifyAccount/${props.match.params.token}`);
        history.push("/login", {
          alert: resp.data.message
        });

      } catch (err) {
        history.push("/login", {
          alert: err.response.data.message
        });
      }
    }

    req();
  });

  return (
    <>
      <div className="verify_acc">
        <div className="loader">
          {/* <div> */}
          <SpinnerInfinity
            size={75}
            thickness={150}
            color="#161b22" />
          <h6 className="register_load_h6">Please wait till we are verifying your account...</h6>
        </div>
      </div>
    </>
  );
}

export default VerifyAccount;
