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

const App = () => {

    moment.locale('uz-latn');
    axios.defaults.baseURL="http://127.0.0.1:8000";

    return (
        <div className="App">
            <Switch>
                <Route exact path="/"
                    render={
                        () =>< Redirect to = "/home" />
                    }/>
                <Route path="/home"
                    component={Home}/>

                <Route path="/cabinet" component={CabinetIndex} />
            </Switch>
        </div>
    )
}

export default App;
