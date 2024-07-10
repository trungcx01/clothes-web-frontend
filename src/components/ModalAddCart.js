import {Button, Modal} from "react-bootstrap";
import {useEffect} from "react";

const ModalAddCart = (props) =>{
    const {show, handleClose} = props;

    return(
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc chắn muốn xóa user này không?</p>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                       No
                    </Button>
                    <Button variant="primary" >
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModalAddCart;