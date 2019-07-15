import React, {Component} from 'react'
import { Switch, Route } from 'react-router-dom'
import {index, admin} from '../Routing/Routes'
import Welcome from '../Components/PublicArea/Welcome/Welcome';
import Admin from '../Components/Admin/Admin';

export default class PublicRouting extends Component {
    render() {
        return (
            <Switch>
                <Route path={index} exact component={Welcome}/>
                <Route path={admin} component={Admin}/>
            </Switch>
        )
    }
}