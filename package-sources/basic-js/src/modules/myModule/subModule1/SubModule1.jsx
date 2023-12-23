import { useState } from "react";
import { Modal, Button } from "react-uberconsole";

function SubModule1() {

       let [showAlert, setShowAlert] = useState(false);

       const onBtnClick = () => {
              setShowAlert(true);
       }

       return (
              <div className="page-container">
                     <div className="page-title">Sub Module 1</div>
                     <div>
                            <Button onClick={onBtnClick}>Click Here</Button>
                     </div>
                     <Modal title="This is a Modal" isShowing={showAlert} >
                            <div className="container">
                                   Hello there !
                            </div>
                     </Modal>

              </div>
       )
};

export default SubModule1;