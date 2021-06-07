import React, {useEffect, useState} from 'react';
import './home.style.scss';
import DynaGrid from '../../../components/dyna-grid/dyna-grid.component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { get_home_config } from '../../../utils/home.config.provider';
import {useTranslation} from "react-i18next";
import {Spin} from "antd";
import {render} from "@testing-library/react";
import {keyframes} from "styled-components";
import { useHistory } from "react-router-dom";


const HomePage = ({ doc, hideTabs, addParams, customButton })=> {

    const {t} = useTranslation();

    const tabs = {
        1: [0],
        2: [1],
        3: [2],
        4: [0, 1, 2, 3]
    }

    const history = useHistory();
    const { title, createTitle, createUrl, gridSourceUrl, gridConfig } = get_home_config(doc);

    const [activeTab, setActiveTab] = useState(1);

    // useEffect(()=>{
    //     function onKeyPress(e) {
    //         console.log("E",e.key);
    //     }
    //     window.addEventListener('keypress', onKeyPress);
    // },[])

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.keyCode === 27 || e.keyCode===8) {
                history.push('/cabinet');
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <div className="factura-home-page-container">
            <div className="factura-home-sub-con">
                <div className="factura-home-title">
                    <div style={{fontSize: 32, fontWeight: "bold"}}>{ t(title) }</div>
                    {/* {
                        customButton 
                        ?customButton
                            : <Link to={createUrl}><button style={{marginRight: 10}} className="custom-primary-btn">{createTitle}</button></Link>
                    } */}
                </div>
                {
                //     hideTabs
                //     ? null
                //     : <div className="factura-home-list-tabs">
                //     <div className="factura-home-list-tab-con">
                //         <div onClick={()=>setActiveTab(1)} className={`status-tab-bar ${activeTab===1 ? 'active-tab' : ''}`}>
                //             {t("Kiruvchi")}
                //         </div> 
                //         <div onClick={()=>setActiveTab(2)} className={`status-tab-bar ${activeTab===2 ? 'active-tab' : ''}`}>
                //             {t("Chiquvchi")}
                //         </div>
                //         <div onClick={()=>setActiveTab(3)} className={`status-tab-bar ${activeTab===3 ? 'active-tab' : ''}`}>
                //             {t("Saqlangan")}
                //         </div>
                //         <div onClick={()=>setActiveTab(4)} className={`status-tab-bar ${activeTab===4 ? 'active-tab' : ''}`}>
                //             {t("Barchasi")}
                //         </div>
                //     </div>
                // </div>
                }
                

                <div>dddd
                    <DynaGrid   
                        tableAttachedTabs={[
                            {
                                title: t("Imzo kutilmoqda"),
                                color: ""
                            },
                            {
                                title: t("Imzolangan"),
                                color: "#0FBE7B"
                            },
                            {
                                title: t("Bekor qilingan"),
                                color: "#FE346E"
                            }
                        ]}
                        config={{...gridConfig, dataSourcePath: `${gridSourceUrl}?${addParams ? addParams.map(p=>`${p.name}=${p.value}`): ""}`}}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
