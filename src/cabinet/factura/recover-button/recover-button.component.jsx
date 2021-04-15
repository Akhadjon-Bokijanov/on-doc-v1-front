import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import { selectDrafts } from '../../../redux/factura-draft/factura-draft.selector'

const RecoverFacturaButton = ({ drafts }) => {
    console.log(drafts);
    return (
        <div>
            
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    drafts:  selectDrafts
})

export default connect(mapStateToProps)(RecoverFacturaButton)
