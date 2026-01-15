import React from "react";
import { Col, Modal, Row } from "react-bootstrap";
import styles from "./styles.module.css";
import StyleButton from "@/components/shared/style-button";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";

interface AdminDeleteModalProps {
  show: boolean;
  handleClose: (success: boolean) => void;
  target: String;
}

const AdminDeleteModal: React.FC<AdminDeleteModalProps> = ({
  show,
  handleClose,
  target,
}) => {
  return (
    <Modal
      show={show}
      onHide={() => handleClose}
      className={styles.modal}
      animation={true}
    >
      <Modal.Body className={styles.modal_body}>
        Are you sure you want to delete this {target} ?
        <Row>
          <Col lg={6} xs>
            <div onClick={() => handleClose(true)}>
              <StyleButton icon={faTrash} action="Delete" type_button="red" />
            </div>
          </Col>

          <Col lg={6} xs>
            <div onClick={() => handleClose(true)}>
              <StyleButton
                icon={faTimes}
                action="Cancelar"
                type_button="blue"
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AdminDeleteModal;
