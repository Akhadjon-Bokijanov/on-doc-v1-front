import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import './components/font-awesome-icons/font-awesome-icons';
import Home from './frontend/home/home.component';
import CabinetIndex from './cabinet/index.component';
import moment from 'moment';
import "moment/locale/uz-latn";
import 'moment/locale/ru';
import axios from 'axios';
import FrontIndexRouter from './frontend/index.router';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectToken } from './redux/user/user.selector';
import { useEffect } from 'react';
//import './e-imzo/e-imzo';
//import EIMZOClient from './e-imzo/e-imzo-client';

const App = ({ user, token }) => {

    moment.locale('uz-latn');
    axios.defaults.baseURL="http://127.0.0.1:8000";
    
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    // useEffect(()=>{
    // }, [token])

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path="/"
                    render={
                        () =>< Redirect to = "/home" />
                    }/>
                <Route path="/home"
                    component={ FrontIndexRouter }/>

                <Route path="/cabinet" 
                    render={()=>user ? <CabinetIndex /> : <Redirect to="/home/login" />} />
            </Switch>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    token: selectToken
})

export default connect(mapStateToProps)(App);
