import React, { useState, useEffect } from 'react'
import { Modal, ModalBody } from 'reactstrap';

const AlertModal = props => {
    const { showModal, closeHandler, content } = props
    return (
        <Modal isOpen={ showModal } toggle={closeHandler} backdrop >
            <ModalBody className="text-center"><h2 className="text-orange">{content}</h2></ModalBody>
        </Modal>
    )
}

export default AlertModal