import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import './components/font-awesome-icons/font-awesome-icons';
import Home from './frontend/home/home.component';

const App = () => {
    return (
        <div className="App">
            <Switch>
                <Route exact path="/"
                    render={
                        () =>< Redirect to = "/home" />
                    }/>
                <Route path="/home"
                    component={Home}/>
            </Switch>
        </div>
    )
}

export default App;
