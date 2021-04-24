import './App.css';
import 'antd/dist/antd.css';
import { Switch, Route, Redirect } from 'react-router-dom';
import './components/font-awesome-icons/font-awesome-icons';
import CabinetIndex from './cabinet/index.component';
import moment from 'moment';
import "moment/locale/uz-latn";
import 'moment/locale/ru';
import axios from 'axios';
import FrontIndexRouter from './frontend/index.router';
import Header from './components/header/header.component';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser, selectLoadedKey, selectToken } from './redux/user/user.selector';
import { logOut } from './redux/user/user.action';
import { API_HOST } from './env';
import AdminIndexRouter from './admin/admin.router';
import { message, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Auth from "./pages/auth";
import UserContext from "./context/UserContext";

const ForAuthenticatedUsers=()=>{
    return(
        <>
            <Switch>
                <Route path="/home" render={()=> <FrontIndexRouter /> } />
                <Route path="/admin" render={()=> <AdminIndexRouter /> }/>
                <Route path="/cabinet" render={()=> <CabinetIndex /> } />
                <Route render={() => <Redirect to="/home/choosecompany" />}></Route>
            </Switch>
        </>
    )
};


const App = ({ user, token, loadedKey, signOut })=> {

    const [btoken,setBtoken]=useState('');

    moment.locale('uz-latn');
    moment.defaultFormat='MMMM Do YYYY'
    const { t } = useTranslation();
    localStorage.setItem("bearer", JSON.stringify(token))
    axios.defaults.baseURL = API_HOST
    axios.defaults.headers.common['Authorization'] = "Bearer " + token;

    useEffect(()=>{

        setBtoken(JSON.stringify(token))
        if (loadedKey?.time + 1000 * 60 * 30 < Date.now()){
            console.log("Hi")
            signOut()
            message.warn((t("Sessiyangiz tugadi!")))
        }
    }, [])
    
   

    return (
        <div className="App">
            {
                user?
                    <UserContext.Provider value={{
                        token:btoken
                    }}>
                        <ForAuthenticatedUsers/>
                    </UserContext.Provider>
                    :<Auth/>
            }
            
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    token: selectToken,
    loadedKey: selectLoadedKey
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
