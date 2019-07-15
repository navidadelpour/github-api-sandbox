import React, {Component} from 'react'
import gql from 'graphql-tag'
import {Input,Form,Header, Grid, Segment} from 'semantic-ui-react';
import {Mutation} from 'react-apollo' 
import {Formik} from 'formik'

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

const optimisticResponse = (values) => ({
  createRepository: {
    repository: {
      name: values.name + " optimisitc",
      createdAt: new Date(),
      description: values.description,
      repositoryTopics: {
        edges: [],
        __typename: "RepositoryTopicConnection"
      },
      __typename: "Repository",
    },
    __typename: "CreateRepositoryPayload",
  },
  __typename: "Mutation"
})

export default class RepositoryAdd extends Component {
    handleSubmit(values, mutate, {query, variables}) {
        mutate({
            variables: {"repoData": values},
            optimisticResponse: optimisticResponse(values),
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
                          cursor: "x",
                          node: data.repository
                        },
                      ]
                    }
                  }
                }
              })
            }
        })
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
                  <Formik
                    initialValues= {{name: "", description: "", visibility: "PRIVATE"}}
                    onSubmit={(values, {setSubmitting}) => {this.handleSubmit(values, mutate, this.props); setSubmitting(false)}}
                  >{({handleChange, handleSubmit, values, isSubmitting}) => (
                    <Form onSubmit={handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Input fluid label='repository name' name='name' value={values.name} placeholder='cool-app' onChange={handleChange }/>
                        <Form.Select fluid label='visibialty' name="visibility" value={values.visibility} options={options} placeholder='visibialty' onChange={handleChange }/>
                    </Form.Group>
                    <Form.TextArea label='description' name="description" value={values.description} placeholder='Tell us more about your repository...' onChange={handleChange }/>
                    <Form.Button disabled={isSubmitting} fluid color='green'>add</Form.Button>
                    </Form>
                  )}</Formik>
                </Segment>
                </Grid.Column>
                </Grid.Row>
            </Grid>
        )}</Mutation>

      )
    }
}