import React, { useState, useEffect } from 'react'
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';

const ResultModal = props => {
    const { showModal, closeHandler, savedUsers } = props
    return (
        <Modal isOpen={showModal} toggle={closeHandler} backdrop >
            <ModalBody className="text-center">
                <p>Los usuarios:</p>
                <ul>
                    {
                        savedUsers.map(user => <li>{user}</li>)
                    }
                </ul>
                <p>Fueron guardados con éxito</p></ModalBody>
            <ModalFooter>
                <Button onClick={closeHandler}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}

export default ResultModal