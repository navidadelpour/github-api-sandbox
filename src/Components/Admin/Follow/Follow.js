          
import React from 'react'
import UserCardSimple from '../UserCardSimple';
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import {Loader, Grid} from 'semantic-ui-react'

const GET_FOLLOW = (type) => {
return gql`{
    viewer {
      ${type}(first: 100) {
        edges {
          node {
            avatarUrl
            bio
            name
          }
        }
      }
    }
  }
` }

export default class Follow extends React.Component{
    render () {
      return (
        <Query query={GET_FOLLOW(this.props.type)}>
            {({error, loading, data}) => {
                if(loading) return <Loader active inline='centered' />
                if(error) return <span>{error.message}</span>
                return (
                  <Grid>
                    <Grid.Row columns={3}>
                    {data.viewer[this.props.type].edges.map((data, i) => {
                        return <UserCardSimple {...data.node} key={i} />
                    })}
                    </Grid.Row>
                  </Grid>
              

                )
            }}
        </Query>
      )
    }
} 