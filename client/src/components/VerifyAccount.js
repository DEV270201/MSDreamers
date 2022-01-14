import React, {useEffect, useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { SpinnerInfinity } from 'spinners-react';

function VerifyAccount(props) {
    let history = useHistory();
    const [resp, setResp] = useState();

    useEffect(()=>{
        const req = async () => {
          try {
            const r = await axios.get(`/users/verifyAccount/${props.match.params.token}`);
            setResp(r.data.message);
          } catch (err) {
            setResp(err.response.data.message);
          }
        }
        req();
        const redirect = () => {
            if (resp){
                history.push("/login", {
                    alert: resp
                  });
            }

        }
        redirect()
    },[]);

    return(
        <>
            <div className="verify_acc">
              <div className="loader">
                {/* <div> */}
                <SpinnerInfinity
                  size={75}
                  thickness={150}
                  color="#161b22" />
                <h6 className="register_load_h6">This may take a moment....</h6>
              </div>
            </div>
        </>
    );
}

export default VerifyAccount;
