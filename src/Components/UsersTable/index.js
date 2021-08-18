import React from 'react'
import { Table } from 'reactstrap'
import './styles.scss'
const UsersTable = props => {
    const { headers, usersCollection, cellHandler, deleteHandler } = props
    return (
        <>

            <Table striped>
                <thead>
                    <tr>
                        {
                            headers.map((header, index) => <th key={index}>{header.label}</th>)
                        }
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        usersCollection.map((user, index) => (<tr key={index} >
                            {
                                headers.map((header, index) => {
                                    return user[header.key]
                                        ? <td key={index} onClick={() => { cellHandler(user) }}>{user[header.key]}</td>
                                        : <td key={index} onClick={() => { cellHandler(user) }}>&nbsp;</td>
                                })
                            }
                            <td>
                                <i
                                    className='control-icon fas fa-trash'
                                    data-user-id={user._id}
                                    onClick={deleteHandler}
                                ></i>
                            </td>
                        </tr>))
                    }
                </tbody>
            </Table>
        </>
    )
}

export default UsersTable