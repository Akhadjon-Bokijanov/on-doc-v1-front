import React from 'react';
import { Card } from 'antd';
import './max-min-card.style.css';
import { createStructuredSelector } from 'reselect';
import { selectIsCardMaximized } from '../../redux/header/header.selector';
import { toogleCardMaximize } from '../../redux/header/header.actions';
import { connect } from 'react-redux';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'

const MaximizeMinimizeCard = ({children, toogleIsMaximised, isCardMaximized, ...otherProps})=>(
    <Card 
        className={`maximize-minimize-card-component ${isCardMaximized ?'maximize-minimize-card-component-maximized' : null}`} 
        extra={isCardMaximized 
            ? <FullscreenExitOutlined 
            onClick={toogleIsMaximised} 
            className="maximize-minimize-card-component-icon" />
            : <FullscreenOutlined 
                onClick={toogleIsMaximised} 
                className="maximize-minimize-card-component-icon" /> 
            }
        {...otherProps}>
        {children}
    </Card>
)

const mapStateToProps = createStructuredSelector({
    isCardMaximized: selectIsCardMaximized
})

const dispatchMapToProps = (dispatch)=>({
    toogleIsMaximised: ()=>dispatch(toogleCardMaximize())
})

export default connect(mapStateToProps, dispatchMapToProps)(MaximizeMinimizeCard);