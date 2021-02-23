import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge, Modal, Tag } from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import './right-sidebar.style.scss';
import { IMPORTANCE } from '../../env';
import { setCabinetData } from '../../redux/user/user.action';
import { connect } from 'react-redux';

const RightSidebar = ({ location, admin, setData }) => {

    

    const [active, setActive] = useState({})
    const [notifications, setNotifications] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [badgeCount, setBedgeCount]=useState({
        factura_awaiting: 0,
        contract_awaiting: 0,
        act_awaiting:0,
        emp_awating: 0,
        tty_awaiting:0,
    })
    useEffect(()=>{
        setActive({
            cabinet: location.pathname==="/cabinet",
            factura: location.pathname.includes("/factura"),
            contract: location.pathname.includes("/contract"),
            empowerment: location.pathname.includes("/empowerment"),
            act: location.pathname.includes("/act"),
            tty: location.pathname.includes("/tty"),
            freeDoc: location.pathname.includes("/free-template"),
            notification: location.pathname.includes("/notification")
        })
    }, [location.pathname])

    const closeModel = ()=>{
        setShowModal(false);
    }

    useEffect(()=>{
        axios({
            method: "GET",
            url: "/api/v1/cabinet"
        }).then(res=>{
            const { notifications } = res.data
            setData(res.data)
            setNotifications(notifications);
            if(Array.isArray(notifications) && notifications.length){
                setShowModal(true)
            }
            setBedgeCount(res.data)
        }).catch(err=>{
            console.log(err)
        })
    }, [])

    return (
        <div className="cabiner-right-sidebar-cmain-container">

            <Modal 
            bodyStyle={{width: '70wv'}}
            title="Notifications"
            visible={showModal}
            onOk={closeModel}
            onCancel={closeModel}
            cancelButtonProps={{style: {display: "none"}}}
            >
                {
                    notifications.map((n, index)=><div style={{marginBottom: 30}}>
                        <h3>{index+1}. {n.title_uz}</h3>
                        <div><Tag 
                        style={{marginRight: 10}}
                            color={IMPORTANCE[n.importance].color}>
                                {IMPORTANCE[n.importance].text} 
                        </Tag>
                        {moment(n.updated_at).format("MMMM Do YYYY, H:mm:ss")}
                        </div>
                        <div>{ n.body_uz }</div>
                        <hr/>
                    </div>)
                }
            </Modal>
            

            <div className="cabiner-right-sidebar-sub-container">
                <div className="cabinet-documents-action-containers-bloks">
                    <Link to="/cabinet">
                        <div className={`action-bloks ${active.cabinet ? 'active' : ''}`}>
                            <FontAwesomeIcon icon="home" /> Bosh sahifa
                        </div>
                    </Link>
                    <Link to="/cabinet/factura">
                            <div className={`action-bloks ${active.factura ? 'active' : ''}`}>
                                <FontAwesomeIcon icon="file-invoice" className="action-icon" /> Faktura
                                <Badge style={{marginLeft: 10}} count={badgeCount.factura_awaiting} />
                            </div>
                    </Link>
                    <Link to="/cabinet/contract">
                        <div className={`action-bloks ${active.contract ? 'active' : ''}`}>
                            <FontAwesomeIcon icon="file-contract" className="action-icon"/> Shartnoma
                            <Badge style={{marginLeft: 10}} count={badgeCount.contract_awaiting} />
                        </div>
                    </Link>
                    <Link to="/cabinet/act">
                        <div className={`action-bloks ${active.act ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={["far", "file-alt"]} className="action-icon"/> Akt
                            <Badge style={{marginLeft: 10}} count={badgeCount.act_awaiting} />
                        </div>
                    </Link>
                    <Link to="/cabinet/empowerment">
                        <div className={`action-bloks ${active.empowerment ? 'active' : ''}`}>
                            <FontAwesomeIcon icon="file-signature" className="action-icon"/>Ishonchnoma
                            <Badge style={{marginLeft: 10}} count={badgeCount.emp_awating} />
                        </div>
                    </Link>
                    <Link to="/cabinet/tty">
                        <div className={`action-bloks ${active.tty ? 'active' : ''}`}>
                            <FontAwesomeIcon icon={["far", "file-archive"]} className="action-icon"/> TTY
                            <Badge style={{marginLeft: 10}} count={badgeCount.tty_awaiting} />
                        </div>
                    </Link>
                    {
                        admin 
                        ? <Link to="/admin/notification">
                            <div className={`action-bloks ${active.notification ? 'active' : ''}`}>
                                <FontAwesomeIcon icon={["far", "bell"]}  className="action-icon"/> Notification
                                <Badge style={{marginLeft: 10}} count={3} />
                            </div>
                        </Link>
                        : null
                    }
                </div>
            </div> 
        </div>
    )
}


const mapDispatchToProps = dispatch =>({
    setData: data => dispatch(setCabinetData(data))
})

export default connect(null, mapDispatchToProps)(withRouter(RightSidebar));
