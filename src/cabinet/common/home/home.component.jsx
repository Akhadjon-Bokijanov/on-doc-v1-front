import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import './home.style.scss';
import DynaGrid from '../../../components/dyna-grid/dyna-grid.component';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { get_home_config } from '../../../utils/home.config.provider';


const { TabPane } = Tabs;

const HomePage = ({ doc })=> {

    const { title, createTitle, createUrl, gridSourceUrl, gridConfig } = get_home_config(doc);

    const [dataSource, setDataSource] = useState([]);

    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        axios({
            method: "get",
            url: gridSourceUrl,
        }).then(res=>{
            setDataSource(res.data)
        }).catch(err=>{
            console.log(err);
        })
    }, [])

    return (
        <div className="factura-home-page-container">
            <div className="factura-home-sub-con">
                <div className="factura-home-title">
                    <h2>{ title }</h2>
                    <Link to={ createUrl }><span>{ createTitle }</span></Link>
                </div>
                <div className="factura-home-list-tabs">
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
                <div>
                    <DynaGrid
                        dataSource={dataSource}
                        config={gridConfig}
                    />
                </div>
            </div>
        </div>
    )
}

export default HomePage