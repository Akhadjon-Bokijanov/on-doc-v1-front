import React from 'react'
import Select from "react-select"
import { ENTER_KEY, TAB_KEY } from 'react-datasheet/lib/keys';

const GridSingleSidedTyle = ({ onCommit, onRevert }) => {



    const optionTags = [
        { value: 1, label: "На физ. лицо" },
        { value: 2, label: "На экспорт" },
        { value: 3, label: "На импорт" },
        { value: 4, label: "Реализация, связанная с гос. секретом" },
        { value: 5, label: "Финансовые услуги" }

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
                onChange={opt => { onCommit(opt.value) }}
                //onSelect={this.handleChange}
                //onInputKeyDown={handleKeyDown}
                options={optionTags}
            />
        </div>
    )
}

export default GridSingleSidedTyle
