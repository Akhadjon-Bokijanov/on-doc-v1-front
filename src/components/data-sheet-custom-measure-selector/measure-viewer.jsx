import React from 'react'
import { measures } from './custom-selector.component'

const MeasureViewer = ({ value }) => {

    let measure = measures.find(item=>item.value===+value)

    return (
        <div>
            {measure?.label}
        </div>
    )
}

export default MeasureViewer
