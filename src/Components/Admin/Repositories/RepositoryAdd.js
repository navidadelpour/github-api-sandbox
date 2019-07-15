import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Input,Form,Header, Grid, Segment} from 'semantic-ui-react';
import {Mutation} from 'react-apollo' 

const CREATE_REPOSITORY =
gql`mutation ($repoData: CreateRepositoryInput!) {
    createRepository(input: $repoData) {
      repository {
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
`  

const options = [
    { key: 'm', text: 'private', value: 'PRIVATE' },
    { key: 'f', text: 'public', value: 'PUBLIC' },
    { key: 'o', text: 'internal', value: 'INTERNAL' },
  ]

export default class RepositoryAdd extends Component {
    getInitialState() {
        return ({
            "repoData": {
                "name": "",
                "visibility": "PRIVATE",
                "description": ""
            }
        })
    }

    constructor(props) {
        super(props);
        this.state = this.getInitialState()
    }

    handleChange = (e, {name, value}) => {
        this.setState({
            repoData: {
                ...this.state.repoData,
                [name]: value
            }
        })
    }
    handleSubmit(mutate, {query, variables}) {
        mutate({
            variables: this.state,
            optimisticResponse: {
              createRepository: {
                repository: {
                  name: this.state.repoData.name + " optimisitc",
                  createdAt: new Date(),
                  description: this.state.repoData.description,
                  repositoryTopics: {
                    edges: [],
                    __typename: "RepositoryTopicConnection"
                  },
                  __typename: "Repository",
                },
                __typename: "CreateRepositoryPayload",
              },
              __typename: "Mutation"
            },
            update: (proxy, {data}) => {
              const prev = proxy.readQuery({
                query,
                variables
              })
              proxy.writeQuery({
                query,
                variables,
                data: {
                  ...prev,
                  user: {
                  ...prev.user,
                  repositories: {
                      ...prev.user.repositories,
                      edges: [
                        ...prev.user.repositories.edges,
                        {
                          __typename: "RepositoryEdge",
                          cursor: "Y3Vyc29yOnYyOpK5MjAxOS0wNy0xNVQxMzozMDo1OSswNDozMM4LvWq9",
                          node: data.repository
                        },
                      ]
                    }
                  }
                }
              })
            }
        })
        this.setState(this.getInitialState())
    }
  
    render() {
      return (
        <Mutation mutation={CREATE_REPOSITORY}>{(mutate, {error, data}) => (
            <Grid>
            {error && <p>{error.message}</p>}
            {data && (<pre>{JSON.stringify(data, null, 2)}</pre>)}
            <Grid.Row>
                <Grid.Column column='16'>
                <Segment>
                <Form onSubmit={(e) => this.handleSubmit(mutate, this.props)}>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='repository name' name='name' value={this.state.repoData.name} placeholder='cool-app' onChange={this.handleChange}/>
                    <Form.Select fluid label='visibialty' name="visibility" value={this.state.repoData.visibility} options={options} placeholder='visibialty' onChange={this.handleChange}/>
                </Form.Group>
                <Form.TextArea label='description' name="description" value={this.state.repoData.description} placeholder='Tell us more about your repository...' onChange={this.handleChange}/>
                <Form.Button fluid color='green'>add</Form.Button>
                </Form>
                </Segment>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        )}</Mutation>

      )
    }
}