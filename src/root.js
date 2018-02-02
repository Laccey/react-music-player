import React from 'react';
import Player from './page/player';
import MusicList from './page/musicList';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import App from './app';

export default class Root extends React.Component{
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' component={App}></Route>
                    {/*<Route exact path='/' component={Player}></Route>*/}
                    {/*<Route path='/list' component={MusicList}></Route>*/}
                </Switch>
            </Router>
        );
    }
}