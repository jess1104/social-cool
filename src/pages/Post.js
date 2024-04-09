import React from 'react';
// Grid會自動分成16等份，要用width={num}去劃分等份
import { Grid, Container, Image, Header, Segment, Icon } from 'semantic-ui-react'
// 可以去拿domain的參數
import { useParams } from 'react-router-dom'

import Topics from '../components/Topics'
import firebase from '../utils/firebase'
import 'firebase/compat/firestore';

function Post() {
    const { postId } = useParams()
    const [post, setPost] = React.useState({ author: {} })
    React.useEffect(() => {
        firebase.firestore().collection('posts').doc(postId).get().then((docSnapshot) => {
            const data = docSnapshot.data()
            setPost(data)
        })
    }, [])
    return <Container>
        <Grid>
            <Grid.Row>
                <Grid.Column width={3}><Topics /></Grid.Column>
                <Grid.Column width={10}>
                    {post.author.photoURL ? <Image src={post.author.photoURL} /> : <Icon name='user circle' />}
                    {post.author.displayName || '使用者'}
                    <Header>
                        {post.title}
                        <Header.Subheader>
                            {post.topic}．{post.createdAt?.toDate().toLocaleDateString()}
                        </Header.Subheader>
                    </Header>
                    <Image src={post.imageUrl} />
                    <Segment basic vertical>{post.content}</Segment>
                    <Segment basic vertical>
                        留言 0．讚 0．
                        <Icon name="thumbs up outline" color='grey' />．
                        <Icon name="bookmark outline" color='grey' />
                    </Segment>
                </Grid.Column>
                <Grid.Column width={3}>空白</Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
}

export default Post