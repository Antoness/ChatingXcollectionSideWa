import React from "react";
import { Modal } from "react-bootstrap";

export const ModalFileUpload = () => {
  return (
    <Modal show={true} centered>
      <Modal.Header closeButton>Upload File</Modal.Header>
      <Modal.Body>test doang bang</Modal.Body>
    </Modal>
  );
};
