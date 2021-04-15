import React from 'react'
import { DatePicker } from 'antd'

const GridDateTime = ({ onCommit, onRevert }) => {

    const handleChange = value=>{
        onCommit(value.target.value)
    }

    return (
        <div>
            <input type="date" style={{border: 'none', outline: 'none', width: '100%'}} onChange={handleChange} />
        </div>
    )
}

export default GridDateTime
