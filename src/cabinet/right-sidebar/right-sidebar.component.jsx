import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Badge, Modal, Tag, Statistic, Spin, Checkbox, Row, Col, Button, Popconfirm} from 'antd';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import moment from 'moment';
import './right-sidebar.style.scss';
import { IMPORTANCE } from '../../env';
import { logOut, setCabinetData } from '../../redux/user/user.action';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { createStructuredSelector } from 'reselect';
import { selectLoadedKey } from '../../redux/user/user.selector';
import AfertaPopup from '../aferta-popup/aferta-popup.component';
import BindroumingPopup from '../bindrouming-popup/bindrouming-popup.component';
import logo from '../../assests/logo_new.svg'
import {RightOutlined} from '@ant-design/icons';
import add from '../../assests/sidebar/add.svg'
import archived from '../../assests/sidebar/archived.svg'
import down from '../../assests/sidebar/down.svg'
import exit from '../../assests/sidebar/exit.svg'
import home from '../../assests/sidebar/home.svg'
import news from '../../assests/sidebar/news.svg'
import saved from '../../assests/sidebar/saved.svg'
import settings from '../../assests/sidebar/settings.svg'
import up from '../../assests/sidebar/up.svg'
import consultant from '../../assests/sidebar/consultant.svg'

import { Menu} from 'antd';

const SubMenu = Menu.SubMenu;
const { Countdown } = Statistic;

const RightSidebar = ({ location, admin, setData, loadedKey, uOut }) => {

    const { t } = useTranslation();



    const [active, setActive] = useState({})
    const [show, setShow] = useState(false)
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
            news: location.pathname.includes("/news"),
            freeDoc: location.pathname.includes("/free-template"),
            notification: location.pathname.includes("/accoount"),
            settings: location.pathname.includes("/settings"),
            add: location.pathname.includes("/add"),
            exit: location.pathname.includes("/login")
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

    const handleOut=()=>{
        // let elem = document.getElementById("add");
        // if(elem.classList.contains('act')){
        //     elem.classList.remove('act');
        //     elem.classList.add("before_act");
        // }
    }
    const handleOver=()=>{
        // let elem = document.getElementById("add");
        // if(elem.classList.contains('before_act')){
        //     elem.classList.remove('before_act');
        //     elem.classList.add('act');
        // }
    }

    return (
        <div className="cabiner-right-sidebar-cmain-container" style={{width: 256}} >
            <AfertaPopup />
            <BindroumingPopup />
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
                    <div style={{marginBottom:"28px",marginTop:'19px', marginLeft: 24}}>
                        <img src={logo} alt=""/>
                    </div>
                    {/*<div>*/}
                        <hr className={"line"}/>
                    {/*</div>*/}
                    {/*<Link to={'/cabinet/add'}>*/}
                        <div className={`flexible one_side`} 
                        //style={{marginLeft: 13, width: 218}}
                        >
                            <Menu mode="vertical" id={'add'} onMouseOver={handleOver} onMouseOut={handleOut} className={'before_act'}>
                            <SubMenu 
                                className={'side_text sub_men'} 
                                title={<span style={{marginLeft: 15}}>
                                <img src={add} className={'side_icon'} alt="" />
                                <span style={{ color: '#fff' }}>
                                    {t("Yaratish")}
                                </span>
                            </span>}>
                                    {/* <Menu.Item style={{width:'254px'}} key="1">
                                        <Link to={'/cabinet/contract/create'}><p className={'menu_item'}>Договор</p></Link>
                                    </Menu.Item> */}
                                    {/*<hr/>*/}
                                    <Menu.Item key="2">
                                        <Link to={'/cabinet/empowerment/create'}><p className={'menu_item'}>Доверенность</p></Link>
                                    </Menu.Item>
                                    {/*<hr/>*/}
                                    <Menu.Item key="3">
                                        <Link to={'/cabinet/factura/create'}><p className={'menu_item'}>Счетфактура</p></Link>
                                    </Menu.Item>
                                    {/*<hr/>*/}
                                    <Menu.Item key="4">
                                        <Link to={'/cabinet/act/create'}><p className={'menu_item'}>Акт</p></Link>
                                    </Menu.Item>
                                    {/*<hr/>*/}
                                    <Menu.Item key="5">
                                        <Link to={'/cabinet/tty/create'}>
                                        <p className={'menu_item'}>ТТН</p>
                                        </Link>
                                    </Menu.Item>
                                </SubMenu>
                            </Menu>
                        </div>

                    {/*</Link>*/}
                    <Link to="/cabinet">
                        <div className={`action-bloks ${active.cabinet ? 'active' : ''} side_text`}>
                            <img src={home} className={'side_icon'} alt=""/> {t("Bosh sahifa")}
                        </div>
                    </Link>
                    <Link to="/cabinet/factura">
                        <div className={`action-bloks ${active.factura ? 'active' : ''} side_text flexible`}>
                            <img src={down} className={'side_icon_updown'} alt=""/>
                            <p>{t("Faktura")} (4)</p>
                            {/*<Badge style={{marginLeft: 10}} count={10} />*/}
                        </div>
                    </Link>
                    <Link to="/cabinet/contract">
                        <div className={`action-bloks ${active.contract ? 'active' : ''} side_text flexible`}>
                            <img src={up} className={'side_icon_updown'} alt=""/>
                            <p>{t("Shartnoma")} (2)</p>
                        </div>
                    </Link>
                    <Link to="/cabinet/act">
                        <div className={`action-bloks ${active.act ? 'active' : ''} side_text flexible`}>
                            <img src={saved} className={'side_icon'} alt=""/>
                            <p>{t("Akt")} (0)</p>
                        </div>
                    </Link>
                    <Link to="/cabinet/empowerment">
                        <div className={`action-bloks ${active.empowerment ? 'active' : ''} side_text flexible`}>
                            <img src={archived} className='side_icon' alt=""/>
                            <p>{t("Ishonchnoma")} (0)</p>
                        </div>
                    </Link>
                    <Link to="/cabinet/news">
                        <div className={`action-bloks ${active.news ? 'active' : ''} side_text`}>
                            <img src={news} className={'side_icon'} alt=""/>{t("Yangiliklar")}
                            <Badge style={{marginLeft: 10}} count={badgeCount.tty_awaiting} />
                        </div>
                    </Link>
                    <Link to="/cabinet/settings">
                        <div className={`action-bloks ${active.settings ? 'active' : ''} side_text`}>
                            <img src={settings} className={'side_icon'} alt=""/>{t("Sozlamalar")}
                            <Badge style={{marginLeft: 10}}  />
                        </div>
                    </Link>
                    {
                        admin 
                        ? <Link to="/admin/notification">
                            <div className={`action-bloks ${active.notification ? 'active' : ''} side_text`}>
                                <FontAwesomeIcon icon={["far", "bell"]}  className="action-icon"/> Notification
                                <Badge style={{marginLeft: 10}} count={3} />
                            </div>
                        </Link>
                        : null
                    }

                    {/*{*/}
                    {/*    loadedKey ?*/}
                    {/*        <div className="action-bloks">*/}
                    {/*        <Countdown*/}
                    {/*            valueStyle={{fontSize: 15, color: '#fff'}}*/}
                    {/*            value={loadedKey.time + 1000 * 60 * 30}*/}
                    {/*            title={<span style={{color: '#fff'}}>{t("Sessiya tugaydi")}</span>}*/}
                    {/*            onFinish={uOut} />*/}
                    {/*        </div>*/}
                    {/*        : null*/}
                    {/*}*/}



                    <div style={{}}>
                        <div className="bottom1">
                            <button className={`consultant`} style={{marginLeft:'24px'}}>
                                <h3 className={'side_text'} style={{color:'#fff',marginBottom:'0'}}><img src={consultant} className={'side_icon'} alt=""/>{t("Konsultant")}</h3>
                            </button>
                        </div>
                        <Popconfirm
                        onConfirm={()=>uOut()}
                        okText={t("Chiqish")}
                        title={t("Chiqishni xoxlaysizmi?")}
                        cancelText={t("Bekor qilish")}
                        >
                            <div 
                                style={{cursor: 'pointer'}} 
                                className={`action-bloks ${active.exit ? 'active' : ''} bottom2 side_text`}>
                                <img src={exit} className={'side_icon'} alt=""/>{t("Exit")}
                            </div>
                        </Popconfirm>
                    </div>

                </div>
            </div>
            {/* <div>
                <Modal title="Basic Modal" style={{width:"500px"}} visible={show} onOk={()=>uOut()} onCancel={handleModal}>
                    <h4>Are you sure,you want to exit!!!</h4>
                </Modal>
            </div> */}
        </div>
    )
}


const mapStateToProps = createStructuredSelector({
    loadedKey: selectLoadedKey
})

const mapDispatchToProps = dispatch =>({
    setData: data => dispatch(setCabinetData(data)),
    uOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RightSidebar));
