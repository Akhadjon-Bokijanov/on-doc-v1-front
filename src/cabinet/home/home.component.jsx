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
import {selectCabinetData, selectCurrentUser} from '../../redux/user/user.selector';
import './home.component.scss';
import {useTranslation} from "react-i18next";
import clock_icon from "../../images/clock-icon.svg";
import pending from "../../images/pending.svg";
import signed_icon from "../../images/signed-icon.svg";
import cancelled_icon from "../../images/cancelled-icon.svg";
import HomeTabCard from '../../components/home-tab-card/HomeTabCard';
import HomeNewsCard from '../../components/home-news-card/HomeNewsCard';
import FirebaseSmsAuth from '../../components/firebase-sms-auth/FirebaseSmsAuth';
import {get_home_config} from "../../utils/home.config.provider";

const CabinetHome = ({ cabinetData,user }) => {
    const [newUrl,setNewUrl] = useState('');
    let { title, createTitle, createUrl, gridSourceUrl, gridConfig } = get_home_config();

    const {t} = useTranslation()

    const [activeTab, setActiveTab] = useState(0);
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
        {
            title: t("Chiquvchi"),
            count: outcome,
            img: pending,
            color: "orange",
            footer: "Shartnoma yaratish",
            link: "/cabinet/documents/signed"
        },
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

    const configHandler = () =>{

    }

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
                title: t("Holati"),
                dataIndex: "status",
                //isFilterable: true,
                width: 70,
                // filters: [
                //     {value: 1, text: "1-Saqlangan"}, 
                //     {value: 2, text: "2-Imzo kutilmoqda"}, 
                //     {value: 3, text: "3-Jo'natilgan"}, 
                //     {value: 4, text: "4-Xatolik yuzbergan"},
                //     {value: 5, text: "5-Qaytarib yuborilgan"}, 
                //     {value: 6, text: "6-Qabul qilingan"}, 
                //     {value: 7, text: "7-Muaffaqiyatli"}]
            },
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
                title: t('Yaratilgan sana'),
                dataIndex: "created_at",
                dataType: 'date',
            },
        ]
    }

    return (
        <div className="cabinet-home-main-container">
            <div className="cabinet-home-sub-container">

                {/* <FirebaseSmsAuth /> */}

                <div style={{fontSize: 32, fontWeight: 700, marginBottom: 8}}>{t("Bosh sahifa")}</div>
                <Row gutter={[16, 16]}>
                    {
                        list_of_docs.map((data, index)=><Col onClick={()=>setActiveTab(index)} md={6} >
                            <HomeTabCard data={data} />
                        </Col>)
                    }
                    
                </Row>

                <HomeNewsCard />
                    home
                <DynaGrid
                    tableAttachedTabs={[
                        {
                            title: t("Bacha hujjatlar"),
                            color: "",
                            url: "all/index"
                        },
                        {
                            title: t("Faktura"),
                            color: "#FE346E",
                            url: "facturas/index"
                        },
                        {
                            title: t("Shartnoma"),
                            color: "#0FBE7B",
                            url: "contract/index"
                        },
                        {
                            title: t("Ishonchnoma"),
                            color: "#FF0000",
                            url: "emp/index"
                        },
                        {
                            title: t("TTY"),
                            color: "yellow",
                            url: "tty/index"
                        },
                        {
                            title: t("Akt"),
                            color: "purple",
                            url:'act/index'
                        }
                    ]}
                    hideFilter
                    title={TabList[activeTab]}
                    // config={dyna_config}
                    config={{...gridConfig, dataSourcePath: `${newUrl}?tin=${user.tin}`}}
                    setNewUrl={setNewUrl}
                />
            </div>
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    cabinetData: selectCabinetData,
    user: selectCurrentUser
})

export default connect(mapStateToProps)(CabinetHome)
