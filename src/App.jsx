import logo from './logo.svg';
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
import { selectCurrentUser, selectToken } from './redux/user/user.selector';
import { logOut } from './redux/user/user.action';
//import './e-imzo/e-imzo';
//import EIMZOClient from './e-imzo/e-imzo-client';

const App = ({ user, token, signOut }) => {

    moment.locale('uz-latn');
    axios.defaults.baseURL = process.env.NODE_ENV === "development" 
    ? "http://127.0.0.1:8000" 
    : "https://murmuring-inlet-47691.herokuapp.com";

    axios.interceptors.response.use(res => {

        console.log(res)

        if (res.status === 401) {
            signOut();
        }

        return res;
    }, e => {

        return Promise.reject(e)
    })

    axios.defaults.headers.common['Authorization'] = "Bearer " + token;
    // useEffect(()=>{
    // }, [token])

    return (
        <div className="App">
            <Header />
            <Switch>
                <Route exact path="/"
                    render={
                        () => < Redirect to="/home" />
                    } />
                <Route path="/home"
                    component={FrontIndexRouter} />

                <Route path="/cabinet"
                    render={() => user ? <CabinetIndex /> : <Redirect to="/home/login" />} />
            </Switch>
        </div>
    )
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser,
    token: selectToken
})

const mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
