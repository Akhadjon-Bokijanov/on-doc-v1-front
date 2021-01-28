import { Spin } from 'antd';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { Document, Page } from 'react-pdf';
import { connect } from 'react-redux';
import { useState } from 'react/cjs/react.development';
import { createStructuredSelector } from 'reselect';
import { selectToken } from '../../../redux/user/user.selector';

const FacturaView = ({ token, match }) => {

    const {facturaId} = match.params;
    const [file, setFile] = useState(<Spin />);

   
    const conf = { 
        url: 'http://127.0.0.1:8000/api/v1/facturas/get-pdf/'+facturaId, 
        httpHeaders: { 'Authorization': 'Bearer '+token }, 
        withCredentials: true }

    return (
        <div style={{margin: 15, padding: 20}}>
            {/* <Document file={`http://127.0.0.1:8000/api/v1/facturas/get-pdf/${facturaId}`}>
                <Page pageNumber={1}/>
                </Document> */}
            <embed 
            headers={{
                'Authorization': 'Bearer '+token
            }}
            width="100%"
            height="600px"
            src={`http://127.0.0.1:8000/api/v1/facturas/get-pdf/${facturaId}`} 
            type="application/pdf" />
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    token: selectToken
})

export default connect(mapStateToProps)(FacturaView)
