import React from 'react';
import { Card } from 'antd';
import './custom-card.style.scss';
const CustomCard = ({ color, title, children })=>{

    return <Card
        className="custom-card-container-ab"
    >
        <div className={`custom-card-title-con custom-card-color-${color}`}>{ title }</div>

        {
            children
        }
    </Card>
}

export default CustomCard;