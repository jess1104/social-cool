import React from 'react';
// Grid會自動分成16等份，要用width={num}去劃分等份
import { Grid, Container, Image, Header, Segment, Icon, Comment, Form } from 'semantic-ui-react'
// 可以去拿domain的參數
import { useParams } from 'react-router-dom'

import Topics from '../components/Topics'
import firebase from '../utils/firebase'
import 'firebase/compat/firestore';

function Post() {
    const { postId } = useParams()
    const [post, setPost] = React.useState({ author: {} })
    const [commentContent, setCommentContent] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    React.useEffect(() => {
        // 只能單次取得資料
        // firebase.firestore().collection('posts').doc(postId).get().then((docSnapshot) => {
        //     const data = docSnapshot.data()
        //     setPost(data)
        // })
        // 監聽某一筆資料變動：onSnapshot
        firebase.firestore().collection('posts').doc(postId).onSnapshot((docSnapshot) => {
            const data = docSnapshot.data()
            setPost(data)
        })
    }, [])

    // 點贊/收藏功能
    function toggle(isActive, field) {
        const uid = firebase.auth().currentUser.uid;
        // 更新收藏
        if (isActive) {
            firebase.firestore().collection('posts').doc(postId).update({
                [field]: firebase.firestore.FieldValue.arrayRemove(uid)
            })
        } else {
            firebase.firestore().collection('posts').doc(postId).update({
                [field]: firebase.firestore.FieldValue.arrayUnion(uid)
            })
        }
    }

    // 是否已收藏
    const isCollected = post.collectedBy?.includes(firebase.auth().currentUser.uid)
    // 是否已點讚
    const isLiked = post.likedBy?.includes(firebase.auth().currentUser.uid)

    function onSubmit() {
        setIsLoading(true)
        // batch功用去判斷有沒有同步打api成功
        const firestore = firebase.firestore();
        const batch = firestore.batch();

        const postRef = firestore.collection('posts').doc(postId)
        batch.update(postRef, {
            // 筆數
            commentsCount: firebase.firestore.FieldValue.increment(1)
        })

        // 子集合
        const commentRef = postRef.collection('comments').doc();
        batch.set(commentRef, {
            content: commentContent,
            createdAt: firebase.firestore.Timestamp.now(),
            author: {
                uid: firebase.auth().currentUser.uid,
                displayName: firebase.auth().currentUser.displayName || '',
                photoURL: firebase.auth().currentUser.photoURL || '',
            }
        });

        batch.commit().then(() => {
            setCommentContent('')
            setIsLoading(false)
        })
    }

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
                        留言 0．讚 {post.likedBy?.length || 0}．
                        <Icon name={`thumbs up ${isLiked ? '' : 'outline'}`} color={isLiked ? 'blue' : 'grey'} link onClick={() => toggle(isLiked, 'likedBy')} />．
                        <Icon name={`bookmark ${isCollected ? '' : 'outline'}`} color={isCollected ? 'orange' : 'grey'} link onClick={() => toggle(isCollected, 'collectedBy')} />
                    </Segment>
                    <Comment.Group>
                        <Form reply>
                            <Form.TextArea value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></Form.TextArea>
                            <Form.Button onClick={onSubmit} loading={isLoading}>留言</Form.Button>
                        </Form>
                        <Header>共 2 篇留言</Header>
                        <Comment>
                            <Comment.Avatar src='' />
                            <Comment.Content>
                                <Comment.Author as='span'>留言者名稱</Comment.Author>
                                <Comment.Metadata>
                                    {new Date().toLocaleDateString()}
                                </Comment.Metadata>
                                <Comment.Text>我覺得這個還好</Comment.Text>
                            </Comment.Content>
                        </Comment>
                    </Comment.Group>
                </Grid.Column>
                <Grid.Column width={3}>空白</Grid.Column>
            </Grid.Row>
        </Grid>
    </Container>
}

export default Post