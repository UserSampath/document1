import React,{useState} from 'react';
import "./Invite.css";
import Button from "../../components/Button/Button";
import SendInvitationCom from '../../components/InvitationCom/SendInvitationCom';
import SideBar from "../../components/side/SideBar";
const SendInvitation = () => {

    const [show, setShow] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(
      localStorage.getItem("sideBarOpen") === "true"
    );
  return (
    <div >
    <SideBar setSidebarOpen={setSidebarOpen} selectedNav="SendInvitation">

      <div>
        <div className="buttonContainner" >
        <Button
                    type={"1"}
                    text="send Invitation"
                    onClick={() => setShow(true)}
                  />
        </div>
      </div>
    </SideBar>
      <SendInvitationCom  
      show={show}
        setShow={setShow}
        handleClose={() => setShow(false)}/>
    </div>
  );
};

export default SendInvitation;
