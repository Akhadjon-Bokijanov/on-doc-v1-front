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
import {useTranslation} from "react-i18next";
import clock_icon from "../../images/clock-icon.svg";
import pending_icon from "../../images/pending-icon.svg";
import signed_icon from "../../images/signed-icon.svg";
import cancelled_icon from "../../images/cancelled-icon.svg";
import HomeTabCard from '../../components/home-tab-card/HomeTabCard';

const CabinetHome = ({ cabinetData }) => {

    const {t} = useTranslation()

    const [activeTab, setActiveTab] = useState(0)
    const { income, outcome, rejected, saved } = cabinetData ?? {};
    const TabList= {
        0: t("Kiruvchi hujjatlar"),
        1: t("Chiquvchi hujjatlar"),
        2: t("Rad etilgan hujjatlar"),
        3: t("Saqlangan hujjatlar")
    }

    const list_of_docs = [
        {
            title: t("Imzo kutilmoqda"),
            count: income,
            img: clock_icon,
            color: "blue",
            footer: "Faktura yaratish",
            link: "/cabinet/documents/waiting"
        },
        // {
        //     title: t("Chiquvchi"),
        //     count: pending_icon,
        //     img: "cloud-upload-alt",
        //     color: "orange",
        //     footer: "Shartnoma yaratish",
        //     link: "/cabinet/documents/signed"
        // },
        {
            title: t("Rad etilgan"),
            count: rejected,
            img: signed_icon,
            color: "green",
            footer: "Akt yaratish",
            link: "/cabinet/documents/rejected"
        },
        {
            title: t("Saqlangan"),
            count: saved,
            img: cancelled_icon,
            color: "pink",
            footer: "Ishonchnoma yaratish",
            link: "/cabinet/documents/saved"
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
                title: t("Hujjat №"),
                dataIndex: 'docNo',
                isSearchable: true,
            },
            {
                title: t("Hujjat turi"),
                dataIndex: "docType",
                isFilterable: true,
                filters: ['factura', 'act', 'contract', 'empowerment', "tty"]
            },
            {
                title: t("Kontrakt №"),
                dataIndex: 'contractNo',
                isSearchable: true,
            },
            {
                title: t("Kontragent"),
                dataIndex: 'sellerName',
                isSearchable: true,
                width: 150
            },
            {
                title: t("Kontragent")+" "+t("STIR"),
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
                title: t("Holati"),
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
                title: t('Yaratilgan sana'),
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
                        list_of_docs.map((data, index)=><Col onClick={()=>setActiveTab(index)} md={6} >
                            <HomeTabCard data={data} />
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
