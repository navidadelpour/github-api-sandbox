import React, {Component} from 'react'
import { Query } from 'react-apollo';
import gql from 'graphql-tag'
import './UserOverview.css'
import { Loader } from "semantic-ui-react"

const GET_USER_OVERVIEW = gql`
query{
    viewer {
        name,
        bio,
        avatarUrl,
        login,
    }
}`

export default class UserOverview extends Component {
    render() {
        return (
            <Query query={GET_USER_OVERVIEW}>
                {({loading, error, data}) => {
                    if(loading) return <Loader active inline='centered' />
                    if(error) return <span>{error.message}</span>
                    return(
                        <div className='overview-card'>
                            <img className='avatar' src={data.viewer.avatarUrl} alt={data.viewer.name}/>
                            <h1>Welcome! {data.viewer.name}</h1>
                            <span className="bio">{data.viewer.bio}</span>
                        </div>
                    )
                }}
            </Query>
        )
    }
}