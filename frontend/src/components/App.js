import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Auth from './Auth';
import MainPage from "./MainPage";


const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/auth" component={Auth}/>
                <Route path="/main" component={MainPage} />
                <Redirect from="/" to="/auth" />
                {/* Другие маршруты */}
            </Switch>
        </Router>
    );
};

export default App;