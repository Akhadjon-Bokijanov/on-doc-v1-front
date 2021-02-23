import { Col, Row } from 'antd';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import AdminCard from '../../components/admin-card/admin-card.component';
import DynaGrid from '../../components/dyna-grid/dyna-grid.component';
import { selectCabinetData } from '../../redux/user/user.selector';
import './home.component.scss';

const CabinetHome = ({ cabinetData }) => {

    const [activeTab, setActiveTab] = useState(0)
    const { income, outcome, rejected, saved } = cabinetData ?? {};
    const TabList= {
        0: "Kiruvchi hujjatlar",
        1: "Chiquvchi hujjatlar",
        2: "Rad etilgan hujjatlar",
        3: "Saqlangan hujjatlar"
    }

    const list_of_docs = [
        {
            title: "Kiruvchi",
            count: income,
            icon: "cloud-download-alt",
            color: "purple",
            footer: "Faktura yaratish",
            create_url: "/cabinet/documents/waiting"
        },
        {
            title: "Chiquvchi",
            count: outcome,
            icon: "cloud-upload-alt",
            color: "green",
            footer: "Shartnoma yaratish",
            create_url: "/cabinet/documents/signed"
        },
        {
            title: "Rad etilgan",
            count: rejected,
            icon: "ban",
            color: "pink",
            footer: "Akt yaratish",
            create_url: "/cabinet/documents/rejected"
        },
        {
            title: "Saqlangan",
            count: saved,
            icon: ["far", "bookmark"],
            color: "orange",
            footer: "Ishonchnoma yaratish",
            create_url: "/cabinet/documents/saved"
        },
    
    ]

    const dyna_config = {
        dataSourcePath: `/api/v1/cabinet/${activeTab}?hi`,
        addActionPath: 'actions/add',
        viewActionPath: '/cabinet/{docType}/view',
        replaceInViewPath: "docType",
        deleteConfirmText: "Shu faktura ochirilsinmi?",
        actions: {
            edit: activeTab===3 ? true : false,
            delete: activeTab===3 ? true : false,
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
                filters: ['factura', 'act', 'contract', 'empowerment', "tty"]
            },
            {
                title: "Kontrakt №",
                dataIndex: 'contractNo',
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
                    config={dyna_config}
                />
            </div>
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    cabinetData: selectCabinetData
})

export default connect(mapStateToProps)(CabinetHome)
