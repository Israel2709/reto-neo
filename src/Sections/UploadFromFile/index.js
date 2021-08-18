import React, { useState } from 'react'
import EditableCell from '../../Components/EditableCell'
import XLSX from 'xlsx'
import api from '../../lib/api'
import ResultModal from '../../Components/ResultModal'
import {
    Form,
    FormGroup,
    Label,
    Input,
    FormText,
    Table,
    Col
} from 'reactstrap'
import './styles.scss'

const UploadFromFile = () => {
    const [dataHeaders, setDataHeaders] = useState(null)
    const [dataBody, setDataBody] = useState(null)
    const [sourceFile, setSourceFile] = useState(null)
    const [editedData, setEditedData] = useState(null)
    const [savedUsers, setSavedUsers] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [modalContent, setModalContent] = useState("test")
    const fileHandler = event => {
        setSourceFile(event.target.files[0])
        const reader = new FileReader()
        reader.onload = e => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });
            const sheetJson = XLSX.utils.sheet_to_json(workbook.Sheets["Users"], { header: 1 });
            setDataHeaders(sheetJson[0])
            setDataBody(sheetJson.slice(1))
            setEditedData(sheetJson.slice(1))
        }
        reader.readAsArrayBuffer(event.target.files[0]);
    }

    const newData = dataBody ? [...dataBody] : null

    const editData = event => {

        const cellId = event.target.dataset.cell
        const rowId = event.target.dataset.row
        const value = event.target.value
        newData[rowId][cellId] = value
        setEditedData(newData)
    }

    const saveHandler = () => {
        const usersList = []
        editedData.forEach( async set => {
            const userObject = {}
            dataHeaders.forEach( (header,index) => {
                userObject[header] = set[index]
            })
            const result = await api.saveUser( userObject )
            usersList.push(result.data.newUser.name)
            setSavedUsers( usersList )
        })
        setShowModal( true )
    }

    
    return (
        <>
            <ResultModal closeHandler={ () => setShowModal(false)} showModal={showModal} closeHandler={() => { setShowModal(!showModal) }} savedUsers={savedUsers}/>
            <Col xs="12">
                <h1 className="mb-3"><b>Carga desde archivo</b></h1>
                <p className="mb-2 text-blue">
                    Selecciona un archivo de excel y úsalo para cargar usuarios </p>
                <Form className="border my-3 p-3">
                    <FormGroup className="d-flex flex-column">
                        <Input
                            type='file'
                            name='file'
                            id='exampleFile'
                            accept='.xlsx, .xls,.xml.csv'
                            onChange={fileHandler}
                        />
                        <p className="text-pink small mt-2 mb-0">
                            Selecciona archivos con extensión .xlsx, .xls,.xml ó .csv
                        </p>
                    </FormGroup>
                </Form>
                {sourceFile &&
                    <>
                        <p className="text-blue mb-0">
                            Da <span className="text-pink">click en un campo</span> para editarlo. Al terminar, da click en <span className="text-pink">"Guardar" </span>para guardar los registros en la base de datos</p>
                        <Table striped>
                            <thead>
                                <tr>
                                    {
                                        dataHeaders && dataHeaders.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataBody && dataBody.map((row, rowId) => (
                                        <tr key={rowId}>
                                            {
                                                row.map((cell, cellId) => (
                                                    <EditableCell
                                                        val={cell}
                                                        rowId={rowId}
                                                        cellId={cellId}
                                                        key={cellId}
                                                        editHandler={editData}
                                                        newData={newData}
                                                    />
                                                ))
                                            }
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        <button 
                            type="button" 
                            className="btn btn-default"
                            onClick={ saveHandler }
                        >Guardar</button>
                    </>
                }
            </Col>
        </>
    )
}

export default UploadFromFile