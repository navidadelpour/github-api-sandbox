import React, {Component} from 'react'
import { Grid } from 'semantic-ui-react'
import HeaderInfo from './Header/HeaderInfo';
import HeaderMenu from './Header/HeaderMenu';
import AdminRouting from './../../Routing/AdminRouting'

export default class UserOverview extends Component {
    render() {
        return (
            <Grid centered>
              <Grid.Column width={12}>
                <HeaderInfo/>
                <HeaderMenu/>
                <AdminRouting/>
              </Grid.Column>
            </Grid>
        )
    }
}