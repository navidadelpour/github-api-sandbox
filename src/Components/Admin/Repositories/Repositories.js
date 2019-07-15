import React, {Component} from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Repository from './Repository';
import {Loader,Card,Header, Grid, Icon, Button} from 'semantic-ui-react';
import RepositoryAdd from './RepositoryAdd'

const GET_REPOSITORIES =
gql`query Reporistories($login: String!, $max_count: Int!, $after: String, $order_by: RepositoryOrder) {
  user(login: $login) {
    repositories(first: $max_count, after: $after, orderBy: $order_by) {
      totalCount
      edges {
        cursor
        node {
          name
          createdAt
          description
          repositoryTopics(first: 10) {
            edges {
              node {
                topic {
                  name
                }
              }
            }
          }
        }
      }
    }
  }
}
`  

const variables = {
  "login": "navidadelpour",
  "max_count": 6,
  "after": null,
  "order_by": {
    "field": "CREATED_AT",
    "direction": "DESC"
  }
}

export default class Repositories extends Component {

    getInitialState() {
      return {
        "wantToAddItem": false
      }
    }

    constructor(props) {
      super(props)
      this.state = this.getInitialState()
      this.handleOnAddButtonClick = this.handleOnAddButtonClick.bind(this) 
    }

    handleOnAddButtonClick() {
      this.setState({"wantToAddItem": !this.state.wantToAddItem})
    }

    render() {
        return (
          <Grid>
            <RepositoriesHeader handleOnAddButtonClick={this.handleOnAddButtonClick}/>
            {this.state.wantToAddItem && <RepositoryAdd query={GET_REPOSITORIES} variables={variables}/>}
            <Grid.Row>
              <Query query={GET_REPOSITORIES} variables={variables}>
              {({loading, error, data, fetchMore}) => {
                if(loading) return <Loader active inline='centered' />
                if(error) return <span>{error.message}</span>
                return (
                  <Grid.Column column='16'>
                    <Card.Group>
                        {data.user.repositories.edges.map((repo, i) => {
                          return <Repository {...repo.node} key={i}/>
                        })}
                        {data.user.repositories.totalCount != data.user.repositories.edges.length &&
                        <Button fluid onClick={() => {fetchMore({
                          variables: {after: data.user.repositories.edges[data.user.repositories.edges.length - 1].cursor},
                          updateQuery: (prev, {fetchMoreResult}) => {
                            if(!fetchMoreResult) return prev;
                            return {
                              ...prev,
                              ...fetchMoreResult,
                              user: {
                              ...prev.user,
                              repositories: {
                                  ...prev.user.repositories,
                                  edges: [
                                    ...prev.user.repositories.edges,
                                    ...fetchMoreResult.user.repositories.edges,
                                  ]
                                }
                              }
                            }
                          }
                        })}}>Fetch More</Button>}
                    </Card.Group>
                  </Grid.Column>
                )
              }}</Query>
            </Grid.Row>
          </Grid>
        )
    }
}

const RepositoriesHeader = (props) => {
  return (
    <Grid.Row>
    <Grid.Column floated='left' column='3'>
      <Header as="h1">Repositories</Header>
    </Grid.Column>
    <Grid.Column floated='right' column='3'>
      <Button color="green" onClick={props.handleOnAddButtonClick}>
        <Icon.Group size='small'>
          <Icon name='plus' />
        </Icon.Group>
        Add
      </Button>
    </Grid.Column>
  </Grid.Row>
  )
}