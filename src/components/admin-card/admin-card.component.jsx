import React from 'react';
import './admin-card.style.scss';
import { Card } from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const AdminCard = ({title, content, footer, icon, color})=>(
    <Card className="admin-card-container" >
        <div className={`admin-card-icon-field admin-card-${color}`} ><FontAwesomeIcon icon={icon} className="admin-card-icon"/></div>
        <div className="admin-card-title">{title}</div>
        <div className="admin-card-content">{content}</div>
        <div className="admin-card-footer"><InfoCircleOutlined style={{color: "#e53935", paddingRight: 5}} />{footer}</div>
    </Card>
)

export default AdminCard;