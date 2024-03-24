import React,{useState} from 'react';
import "./Invite.css";
import Button from "../../components/Button/Button";
import SendInvitationCom from '../../components/InvitationCom/SendInvitationCom';
const backendUrl = import.meta.env.VITE_BACKEND_URL;
const SendInvitation = () => {

    const [show, setShow] = useState(false);

  return (
    <div >
      <div>
        <div className="buttonContainner" >
        <Button
                    type={"1"}
                    text="send Invitation"
                    onClick={() => setShow(true)}
                  />
        </div>
      </div>

      <SendInvitationCom  
      show={show}
        setShow={setShow}
        handleClose={() => setShow(false)}/>
    </div>
  );
};

export default SendInvitation;
