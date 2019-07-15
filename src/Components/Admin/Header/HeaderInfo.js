import React, { Component } from 'react'
import { Grid, Image, Loader } from 'semantic-ui-react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'

const GET_USER_OVERVIEW = gql`
query{
    viewer {
        name,
        bio,
        avatarUrl,
        login,
    }
}`


export default class HeaderInfo extends Component {
  render() {
    return (
        <Query query={GET_USER_OVERVIEW}>
            {({loading, error, data}) => {
                if(loading) return <Loader active inline='centered' />
                if(error) return <span>{error.message}</span>
                return(
                    <Grid>
                        <Grid.Column width={4}>
                            <Image src={data.viewer.avatarUrl} />
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <h1>Welcome {data.viewer.name}!</h1>
                        </Grid.Column>
                    </Grid>
                )
            }}
        </Query>

    )
  }
}