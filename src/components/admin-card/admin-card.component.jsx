import React from 'react';
import './admin-card.style.scss';
import { Badge, Card } from 'antd';
import {PlusCircleTwoTone} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

const AdminCard = ({ data })=>{
    const {title, icon, color, count} = data
    return(
    <Card className="admin-card-container" >
        <div className={`admin-card-icon-field admin-card-${color}`} >
            <FontAwesomeIcon icon={icon} className="admin-card-icon"/>
        </div>
        <div className="admin-card-title">{title}</div>
        <div className="admin-card-content">{count}</div>
        
    </Card>
)}

export default AdminCard;