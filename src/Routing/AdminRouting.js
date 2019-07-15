import React, {Component} from 'react'
import Repositories from './../Components/Admin/Repositories/Repositories';
import RepositoriesAdd from './../Components/Admin/Repositories/RepositoryAdd';
import Home from './../Components/Admin/Home/Home';
import Follow from './../Components/Admin/Follow/Follow';
import { Switch, Route } from 'react-router-dom'
import {admin, repositories, repositories_add, followers, followings} from './Routes'

export default class AdminRouting extends Component {
    render() {
        return (
            <Switch>
                <Route path={admin} exact component={Home}/>
                <Route path={repositories} exact component={Repositories}/>
                <Route path={followers} exact render={(props) => {return <Follow {...props} type="followers"/>}}/>
                <Route path={followings} exact render={(props) => {return <Follow {...props} type="following"/>}}/>
            </Switch>
        )
    }
}