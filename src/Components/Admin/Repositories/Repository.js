import React, { Component } from 'react'

import { Card, Button,Label } from 'semantic-ui-react'

export default class Repository extends Component {
    render() {
        return (
            <Card>
            <Card.Content>
                <Card.Header>{this.props.name}</Card.Header>
                <Card.Meta>{this.props.created_at}</Card.Meta>
                <Card.Description>{this.props.description}</Card.Description>
                <hr/>
                <Card.Meta>
                    {this.props.repositoryTopics.edges.map((item, i) => {
                        return (<Label key={i} as='a' content={item.node.topic.name} icon='computer' />)
                    })}
                </Card.Meta>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button basic color='green'>
                    edit
                </Button>
                <Button basic color='red'>
                    delete
                </Button>
                </div>
            </Card.Content>
            </Card>
        )
    }
}