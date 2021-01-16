import React, { useState } from 'react';
import { Card } from 'antd';
import './max-min-card.style.css';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

const MaximizeMinimizeCard = ({children, ...otherProps})=>
{
    const [isCardMaximized, toogleIsMaximised] = useState(false);
return(
    <Card 
        className={`maximize-minimize-card-component ${isCardMaximized ?'maximize-minimize-card-component-maximized' : null}`} 
        extra={isCardMaximized 
            ? <FullscreenExitOutlined 
            onClick={()=>toogleIsMaximised(!isCardMaximized)} 
            className="maximize-minimize-card-component-icon" />
            : <FullscreenOutlined 
                onClick={()=>toogleIsMaximised(!isCardMaximized)} 
                className="maximize-minimize-card-component-icon" /> 
            }
        {...otherProps}>
        {children}
    </Card>
)}


export default MaximizeMinimizeCard;