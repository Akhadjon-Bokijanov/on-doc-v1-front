import React from 'react';
import { Skeleton } from 'antd';
import './resource-card.style.scss';


const ResourceCardSkaleton = ()=>(
    <div className="resource-card-main-container">
        <div className="resource-card-sub-container">
            <div style={{marginBottom: 15}}>
                <Skeleton.Input style={{ width: '100%' }} active={true} size="default" />
            </div>
            <div style={{marginBottom: 5}}>
                <Skeleton.Button active={true} size="small" />
            </div>
            <div>
                <Skeleton.Input style={{ width: 100, height: 15  }} active={true} size="small" />
            </div>
            <div className="rate-view ">
                <Skeleton.Input style={{ width: 80, height: 18 }} active={true} size="small" />
                <Skeleton.Input style={{ width: 70, height: 18  }} active={true} size="small" />
            </div>
            <div className="rate-view price-and-card">
                <Skeleton.Avatar active={true} shape="circle" />
                <Skeleton.Avatar active={true} shape="circle" />
                <Skeleton.Input style={{ width: 60 }} active={true} size="default" />
            </div>
        </div>
    </div>
)

export default ResourceCardSkaleton