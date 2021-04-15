import React from 'react'
import Select from "react-select"
import { ENTER_KEY, TAB_KEY } from 'react-datasheet/lib/keys';

const GridDocTypeSelect = ({ onCommit, onRevert }) => {

    
    
    const optionTags = [
        { value: 0, label:"STANDARD"},
        { value: 1, label: "QOSHIMCHA"},
        { value: 2, label: "HARAJATLARNI QOPLASH"},
        { value: 3, label: "TOLOVSIZ" },
        { value: 4, label: "TUZATUVCHI"}

    ]

    return (
        <div>
            <Select
                size="small"
                showSearch
                autoFocus
                dropdownClassName="class-codes-drop-down-list"
                style={{ width: "100%" }}
                dropdownMatchSelectWidth={false}
                open={true}
                menuPortalTarget={document.body}
                styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
                //value={this.state.selected}
                onChange={opt=>{onCommit(opt.value)}}
                //onSelect={this.handleChange}
                //onInputKeyDown={handleKeyDown}
                options={optionTags}
            />
        </div>
    )
}

export default GridDocTypeSelect
