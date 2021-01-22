import { Col, Row } from 'antd';
import React from 'react'
import { Link } from 'react-router-dom';
import AdminCard from '../../components/admin-card/admin-card.component';
import DynaGrid from '../../components/dyna-grid/dyna-grid.component';
import './home.component.scss';

const CabinetHome = () => {

    const list_of_docs = [
        {
            title: "Kutilmoqda",
            count: 24,
            icon: ["far", "clock"],
            color: "red",
            footer: "Faktura yaratish",
            create_url: "/cabinet/documents/waiting"
        },
        {
            title: "Imzolangan",
            count: 39,
            icon: ["far", "check-circle"],
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
                dataIndex: 'facturaNo',
                isSearchable: true,
            },
            {
                title: "Hujjat turi",
                dataIndex: "docType",
                isFilterable: true,
                filters: [1, 2, 3, 4, 5, 6]
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
                        list_of_docs.map(data=><Col md={6}>
                            <Link to={data.create_url}><AdminCard data={data} /></Link>
                        </Col>)
                    }
                    
                </Row>
                <DynaGrid
                    config={dyna_config}
                />
            </div>
        </div>
    )
}

export default CabinetHome
