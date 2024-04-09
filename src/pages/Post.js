import React from 'react';
// Grid會自動分成16等份，要用width={num}去劃分等份
import { Grid, Item, Image, Icon } from 'semantic-ui-react'
import firebase from '../utils/firebase'
import 'firebase/compat/firestore';

import Topics from '../components/Topics'

function Post() {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        firebase.firestore().collection('posts').get().then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(doc => {
                const id = doc.id
                return { ...doc.data(), id }
            })
            setPosts(data)
        })
    }, [])
    return <Grid>
        <Grid.Row>
            <Grid.Column width={3}><Topics /></Grid.Column>
            <Grid.Column width={10}>
                <Item.Group>
                    {posts.map(post => {
                        return <Item key={post.id}>
                            <Item.Image src={post.imageUrl} />
                            <Item.Content>
                                <Item.Meta>
                                    {post.author.photoURL ? <Image src={post.author.photoURL} /> : <Icon name='user circle' />}
                                    {post.topic}．{post.author.displayName || '使用者'}
                                </Item.Meta>
                                <Item.Header>{post.title}</Item.Header>
                                <Item.Description>{post.content}</Item.Description>
                                <Item.Extra>留言 0．讚 0</Item.Extra>
                            </Item.Content>
                        </Item>
                    })}
                </Item.Group>
            </Grid.Column>
            <Grid.Column width={3}>空白</Grid.Column>
        </Grid.Row>
    </Grid>
}
export default Post