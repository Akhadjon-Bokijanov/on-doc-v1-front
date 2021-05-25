import { Col, Row } from 'antd';
import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import FacturaIndex from './factura/index.component';
import RightSidebar from './right-sidebar/right-sidebar.component';
import CabinetHome from './home/home.component';
import EmpowermentIndex from './empowerment/index.component';
import ActIndexRouter from './act/index.router';
import ContractIndexRouter from './contract/index.router';
import TTYIndexRouter from './tty/index.router';
import './create.style.scss';
import Notifications from './notifications/notifications.component';
import ProfileComponent from './profile/profile.component';
import CabinetHeader from './cabinet-header/CabinetHeader';
import NewsPage from "../pages/news";
import EmpowermentForm from "./empowerment/create/create.component";
import Deatil from "../components/news/Deatil";
import Balance from "../pages/balance";
import Tariff from "../pages/tariff";
import CurrentTariff from "../components/tariffs/CurrentTariff";
import FontSizeChanger from 'react-font-size-changer';


const CabinetIndex = ({ match }) => {
    const {url} = match;
    return (
        <div id={'target'}>
            <div className={'resizer'}>
            <div style={{ display: 'flex' }} >

                   <RightSidebar />


               <div style={{width: window.innerWidth-256}}>
               {/*<Col md={14} lg={20} style={{width:'1184px'}}>*/}
                   <div >

                       <div style={{boxShadow:'inset 0px -1px 0px rgba(0, 0, 0, 0.08)'}}>
                           <CabinetHeader/>
                       </div>
                       <div id="target">
                           <div className="resizer">
                               <Route  exact path={match.path} component={ CabinetHome } />
                               <Route path={`${url}/factura`} component={ FacturaIndex } />
                               <Route path={`${url}/empowerment`} component={ EmpowermentIndex } />
                               <Route path={`${url}/act`} component={ ActIndexRouter } />
                               <Route path={`${url}/contract`} component={ ContractIndexRouter } />
                               <Route path={`${url}/tty`} component={ TTYIndexRouter } />
                               <Route path={`${url}/notifications`} component={ Notifications } />
                               <Route path={`${url}/settings`} component={ ProfileComponent } />

                               <Route exact path={`${url}/news`} component={NewsPage} />
                               <Route path={`${url}/news/:id`} component={Deatil}/>

                               <Route exact path={`${url}/balance`} component={Balance} />

                               <Route exact path={`${url}/tariffs`} component={Tariff} />
                               <Route path={`${url}/tariffs/:id`} component={CurrentTariff} />
                           </div>
                       </div>
                   </div>
               </div>

            </div>
            </div>
        </div>
    );
};

export default withRouter(CabinetIndex);