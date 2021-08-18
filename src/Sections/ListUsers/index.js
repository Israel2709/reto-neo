import React, { useState, useEffect } from 'react'
import AlertModal from '../../Components/AlertModal'
import api from '../../lib/api'
import './styles.scss'
import {
  Col
} from 'reactstrap'

import UsersTable from '../../Components/UsersTable'
import UserDetails from '../../Components/UserDetails'

const ListUsers = () => {
  const [usersCollection, setUsersCollection] = useState([])
  const [selectedUser, setSelectedUser ] = useState(null)
  const [editedUser, setEditedUser ] = useState( null )
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState("test")

  useEffect(async () => {
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    const usersList = await api.getAllUsers()
    setUsersCollection(usersList.data.users)
  }

  const headers = [
    {
      key: "userName",
      label: "Usuario"
    },
    {
      key: "name",
      label: "Nombre"
    },
    {
      key: "email",
      label: "E-mail"
    }
  ]

  const setSelection = user => {
    setEditedUser(user)
    setSelectedUser(user)
  }
  const deleteUser = async event => {
    const result = await api.deleteUserById(event.target.dataset.userId)
    if( result.succes ){
      setModalContent( "¡Usuario eliminado exitosamente!" )
      setShowModal( true )
      getAllUsers()
      setTimeout( function(){
        setShowModal( false )
      },3000)
    }
  }
  
  const editUser = event => {
    const property = event.target.name
    const value = event.target.value
    setEditedUser( {...editedUser, [property]:value})
  }

  return (
    <>
      <AlertModal showModal={showModal} closeHandler={() => { setShowModal(!showModal) }} content={modalContent} />
      <Col xs="12">
        <h1><b>Usuarios</b></h1>
        <p className="text-blue mb-2">
          Usuarios registrados en Neo. <span className="text-pink fst-italic">Haz click en una fila para más acciones</span>
        </p>
      </Col>
      <Col xs="8">
        <UsersTable
          headers={headers}
          usersCollection={usersCollection}
          cellHandler={ setSelection }
          deleteHandler={ deleteUser }
        />
      </Col>
      <Col xs="4">
        {
          editedUser && 
            <UserDetails 
              editedUser= { editedUser } 
              editHandler= { editUser }
              successHandler= { getAllUsers }
            />
        }
      </Col>
    </>
  )
}

export default ListUsers