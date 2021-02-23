import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import './home.style.scss';
import DynaGrid from '../../../components/dyna-grid/dyna-grid.component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { get_home_config } from '../../../utils/home.config.provider';


const { TabPane } = Tabs;

const HomePage = ({ doc, hideTabs })=> {

    const tabs = {
        1: "in",
        2: "out",
        3: "saved",
        4: "all"
    }

    const { title, createTitle, createUrl, gridSourceUrl, gridConfig } = get_home_config(doc);

    const [activeTab, setActiveTab] = useState(1);
    const [loading, setLoading] = useState(false);

    return (
        <div className="factura-home-page-container">
            <div className="factura-home-sub-con">
                <div className="factura-home-title">
                    <h2>{ title }</h2>
                    <Link to={ createUrl }><span>{ createTitle }</span></Link>
                </div>
                {
                    hideTabs
                    ? null
                    : <div className="factura-home-list-tabs">
                    <div className="factura-home-list-tab-con">
                        <div onClick={()=>setActiveTab(1)} className={`status-tab-bar ${activeTab===1 ? 'active-tab' : ''}`}>
                            Kiruvchi hujjatlar    
                        </div> 
                        <div onClick={()=>setActiveTab(2)} className={`status-tab-bar ${activeTab===2 ? 'active-tab' : ''}`}>
                            Yuborilganlar
                        </div>
                        <div onClick={()=>setActiveTab(3)} className={`status-tab-bar ${activeTab===3 ? 'active-tab' : ''}`}>
                            Saqlanganlar
                        </div>
                        <div onClick={()=>setActiveTab(4)} className={`status-tab-bar ${activeTab===4 ? 'active-tab' : ''}`}>
                            Barchasi
                        </div>
                    </div>
                </div>
                }
                
                
                <div>
                    <DynaGrid    
                        config={{ ...gridConfig, dataSourcePath: `${gridSourceUrl}?tab=${tabs[activeTab]}`}}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage
