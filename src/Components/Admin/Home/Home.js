import React, {Component} from 'react'
import {Header, Grid, Card, Icon, Loader} from 'semantic-ui-react';
import gql from 'graphql-tag'
import {Query} from 'react-apollo'

const GET_ALL_USER_DATA = gql`
query Viewer {
    viewer {
        name
        bio
        login
        email
        location
        websiteUrl
        avatarUrl
        followers {
        totalCount
        }
        following {
        totalCount
        }
    }
}`

export default class Home extends Component {
    render() {
        return (
            <div>
            <Grid>
                <Grid.Row>
                <Grid.Column floated='left' column='3'>
                    <Header as="h1">Home</Header>
                </Grid.Column>
                </Grid.Row>
            </Grid>
            <Query query={GET_ALL_USER_DATA}>{({loading, error, data}) => {
                
                if(loading) return <Loader active inline='centered' />
                if(error) return <span>{error.message}</span>
                const {
                    name,
                    bio,
                    email,
                    location,
                    websiteUrl,
                    avatarUrl,
                    followers: {
                      totalCount: totalFollowersCount
                    } = {},
                    following: {
                      totalCount: totalFollowingCount
                    } = {}
                } = {...data.viewer}
                return (
                    <Grid centered column='4'>
                        <Grid.Column>
                            <Card
                            image={avatarUrl}
                            header={`${name}`}
                            meta={`${location} - ${email} - ${websiteUrl}`}
                            description={bio}
                            extra={
                            <div>
                                <a><Icon name='user' />{totalFollowersCount} followers</a>
                                <a><Icon name='user' />{totalFollowingCount} following</a>
                            </div>
                            }
                            />  
                        </Grid.Column>
                    </Grid>
                )
            }}</Query>
            </div>
        )
    }
}