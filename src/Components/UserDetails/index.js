import React, { useState } from "react"
import { ListGroup, ListGroupItem } from "reactstrap"
import AlertModal from '../../Components/AlertModal'
import api from '../../lib/api'
import './styles.scss'

const UserDetails = props => {
    const [isEditing, setIsEditing] = useState(false)
    const [newProperties, setNewProperties] = useState([])
    const [newPropertiesList, setNewPropertiesList] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState("test")

    const { editedUser, editHandler, successHandler, modalHandlers } = props

    const propertiesListArray = []

    const setPropertyKey = event => {
        const property = event.target.value.split(" ").reduce((accum, current, index) => {
            const word = index == 0 ? current : current.charAt(0).toUpperCase() + current.slice(1)
            return accum + word
        }, "")
        propertiesListArray[event.target.dataset.key][0] = property
        setNewPropertiesList(Object.fromEntries(propertiesListArray))
    }

    const setPropertyValue = event => {
        propertiesListArray[event.target.dataset.key][1] = event.target.value
        setNewPropertiesList(Object.fromEntries(propertiesListArray))
    }

    const addProperties = () => {
        propertiesListArray[newProperties.length] = []
        const propertyElement =
            <ListGroupItem className="d-flex flex-column" key={newProperties.length}>
                <input
                    type="text"
                    placeholder="Nombre del campo"
                    data-key={newProperties.length}
                    onChange={setPropertyKey}
                />
                <input
                    type="text"
                    placeholder="Valor"
                    data-key={newProperties.length}
                    onChange={setPropertyValue}
                />
            </ListGroupItem>
        setNewProperties([...newProperties, propertyElement])
    }

    const saveHandler = async () => {
        const data = { ...editedUser, ...newPropertiesList }
        const result = await api.editUserById(editedUser._id, data)
        if (result.succes) {
            setModalContent("¡Usuario editado exitosamente!")
            setShowModal(true)
            setIsEditing(false)
            successHandler()
            setTimeout(function () {
                setShowModal(false)
            }, 3000)
        }
    }

    return (
        <>
            <AlertModal showModal={showModal} closeHandler={() => { setShowModal(!showModal) }} content={modalContent} />
            <div className="user-details">
                <div className="d-flex justify-content-end pt-2 py-3 align-items-center">
                    {
                        !isEditing ? (
                            <div className='controls' onClick={() => setIsEditing(!isEditing)}>
                                <span className="me-3 text-blue">Editar</span>
                                <i
                                    className='control-icon fas fa-user-edit'
                                ></i>
                            </div>
                        ) : (
                            <div className='controls' onClick={saveHandler}>
                                <span className="me-3 text-blue">Guardar</span>
                                <i
                                    className='control-icon fas fa-save'
                                ></i>
                            </div>
                        )
                    }

                </div>
                <ListGroup>
                    {
                        Object.keys(editedUser).map((key, index) => (
                            key.charAt(0) !== "_" &&
                            <ListGroupItem
                                key={index}
                                className="d-flex flex-column"
                            >
                                <span className="text-pink fw-bold">{key}: </span>
                                <input
                                    value={editedUser[key]}
                                    disabled={!isEditing ? 'disabled' : false}
                                    onChange={editHandler}
                                    name={key}
                                />
                            </ListGroupItem>
                        ))
                    }
                    {
                        newProperties && newProperties.map((property, index) => {
                            return property
                        })
                    }
                    {isEditing && <ListGroupItem className="d-flex justify-content-center">
                        <div
                            className="btn btn-default"
                            onClick={addProperties}
                        >Agregar nuevo campo</div>
                    </ListGroupItem>}
                </ListGroup>
            </div>
        </>
    )
}

export default UserDetails