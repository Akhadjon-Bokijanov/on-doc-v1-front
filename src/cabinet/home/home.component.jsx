import { Col, Row } from 'antd';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminCard from '../../components/admin-card/admin-card.component';
import DynaGrid from '../../components/dyna-grid/dyna-grid.component';
import './home.component.scss';

const CabinetHome = () => {

    const [gridDataSource, setGridDataSource] = useState([]);
    const [activeTab, setActiveTab] = useState(0)
    useEffect(()=>{
        axios({
            url: `/api/v1/cabinet/${activeTab}`,
            method: "GET"
        }).then(res=>{
            setGridDataSource(res.data.docs)
        }).catch(er=>{
            console.log(er);
        })
    }, [activeTab])

    const TabList= {
        0: "Kiruvchi hujjatlar",
        1: "Chiquvchi hujjatlar",
        2: "Rad etilgan hujjatlar",
        3: "Saqlangan hujjatlar"
    }

    const list_of_docs = [
        {
            title: "Kiruvchi",
            count: 24,
            icon: "cloud-download-alt",
            color: "purple",
            footer: "Faktura yaratish",
            create_url: "/cabinet/documents/waiting"
        },
        {
            title: "Chiquvchi",
            count: 39,
            icon: "cloud-upload-alt",
            color: "green",
            footer: "Shartnoma yaratish",
            create_url: "/cabinet/documents/signed"
        },
        {
            title: "Rad etilgan",
            count: 19,
            icon: "ban",
            color: "pink",
            footer: "Akt yaratish",
            create_url: "/cabinet/documents/rejected"
        },
        {
            title: "Saqlangan",
            count: 30,
            icon: ["far", "bookmark"],
            color: "orange",
            footer: "Ishonchnoma yaratish",
            create_url: "/cabinet/documents/saved"
        },
    
    ]

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
                title: "Hujjat №",
                dataIndex: 'docNo',
                isSearchable: true,
            },
            {
                title: "Hujjat turi",
                dataIndex: "docType",
                isFilterable: true,
                filters: ['factura', 'act', 'contract', 'empowerment']
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
                title: "Holati",
                dataIndex: "status",
                isFilterable: true,
                width: 70,
                filters: [
                    {value: 1, text: "1-Saqlangan"}, 
                    {value: 2, text: "2-Imzo kutilmoqda"}, 
                    {value: 3, text: "3-Jo'natilgan"}, 
                    {value: 4, text: "4-Xatolik yuzbergan"},
                    {value: 5, text: "5-Qaytarib yuborilgan"}, 
                    {value: 6, text: "6-Qabul qilingan"}, 
                    {value: 7, text: "7-Muaffaqiyatli"}]
            },
            {
                title: 'Yaratilgan sanasi',
                dataIndex: "created_at",
                dataType: 'date',
            },
        ]
    }

    return (
        <div className="cabinet-home-main-container">
            <div className="cabinet-home-sub-container">
                <Row gutter={[16, 16]}>
                    {
                        list_of_docs.map((data, index)=><Col onClick={()=>setActiveTab(index)} md={6}>
                            <AdminCard data={data} />
                        </Col>)
                    }
                    
                </Row>
                <DynaGrid
                    title={TabList[activeTab]}
                    dataSource={gridDataSource} 
                    config={dyna_config}
                />
            </div>
        </div>
    )
}

export default CabinetHome
