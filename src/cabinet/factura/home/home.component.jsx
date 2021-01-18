import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import './home.style.scss';
import DynaGrid from '../../../components/dyna-grid/dyna-grid.component';
import axios from 'axios';
import { Link } from 'react-router-dom';


const { TabPane } = Tabs;

const FacturaHomePage = ()=> {

    const [dataSource, setDataSource] = useState([]);

    useEffect(() => {
        axios({
            method: "get",
            url: "http://127.0.0.1:8000/api/v1/facturas",
        }).then(res=>{
            setDataSource(res.data)
        }).catch(err=>{
            console.log(err);
        })
    }, [])

    const dyna_config = {
        deleteRequestPath: 'ES/api/blogs',
        addActionPath: 'actions/add',
        viewActionPath: '/cabinet/factura/view',
        deleteConfirmText: "Shu faktura ochirilsinmi?",
        actions: {
            edit: true,
            delete: true,
            view: true
        },
        allColumns: [
            {
                title: "Faktura №",
                dataIndex: 'facturaNo',
                isSearchable: true,
            },
            {
                title: "Kontrakt №",
                dataIndex: 'contractNo',
                isSearchable: true,
            },
            {
                title: "Oluvchi",
                dataIndex: 'buyerName',
                isSearchable: true,
                width: 150
            },
            {
                title: "Oluvchi STIR",
                dataIndex: "buyerTin",
                isSearchable: true,
            },
            {
                title: "Sotuvchi",
                dataIndex: 'sellerName',
                isSearchable: true,
                width: 150
            },
            {
                title: "Sotuvchi STIR",
                dataIndex: "sellerTin",
                isSearchable: true,
            },
            {
                title: "Holati",
                dataIndex: 'currentStateid',
                isFilterable: true,
                filters: [1, 2, 3, 4, 5]
            },
            {
                title: 'Yaratilgan sanasi',
                dataIndex: "created_at",
                dataType: 'date',
            },
        ]
    }

    return (
        <div className="factura-home-page-container">
            <div className="factura-home-sub-con">
                <div className="factura-home-title">
                    <h2>Hisob fakturalar</h2>
                    <span><Link to="/cabinet/factura/create">+ Faktura yaratish</Link></span>
                </div>
                <div className="factura-home-list-tabs">
                    <div className="factura-home-list-tab-con">
                        <div className="status-tab-bar active-tab">
                            Barchasi
                        </div>
                        <div className="status-tab-bar">
                            Kiruvchi hujjatlar    
                        </div> 
                        <div className="status-tab-bar">
                            Yuborilganlar
                        </div>
                        <div className="status-tab-bar">
                            Saqlanganlar
                        </div>
                    </div>
                </div>
                <div>
                    <DynaGrid
                        dataSource={dataSource}
                        config={dyna_config}
                    />
                </div>
            </div>
        </div>
    )
}

export default FacturaHomePage
