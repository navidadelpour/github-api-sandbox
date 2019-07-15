          
import React from 'react'
import { Card, Feed,  Grid} from 'semantic-ui-react'

const UserCardSimple = ({name, bio, avatarUrl}) => (
    <Grid.Column>
        <Card>
            <Card.Content>
            <Feed>
                <Feed.Event>
                <Feed.Label image={avatarUrl} />
                <Feed.Content>
                    <Card.Header as='h3' style={{marginBottom: 0}}>{name}</Card.Header>
                    <Feed.Summary>{bio}</Feed.Summary>
                </Feed.Content>
                </Feed.Event>
            </Feed>
            </Card.Content>
        </Card>
    </Grid.Column>
)

export default UserCardSimple
