import React, {useState} from "react"
const EditableCell = props => {
    const [ isEditing, setIsEditing ] = useState( false )
    const { val, rowId, cellId, editHandler,newData } = props
    return(
        <td onClick={()=>setIsEditing(true)} onBlur={()=>setIsEditing(false)}>
            <div className="editable-cell">
                <p className={`${isEditing ? 'd-none':''}`}>{val}</p>
                <input className={`${!isEditing ? 'd-none':''}`}
                    type="text" 
                    data-row={rowId} 
                    data-cell={cellId} 
                    onChange = {editHandler}
                    value={ newData[rowId][cellId] }
                />
            </div>
        </td>
    )
}

export default EditableCell