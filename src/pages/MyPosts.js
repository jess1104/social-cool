import React from 'react';
import { Item, Header } from 'semantic-ui-react'
import firebase from '../utils/firebase'
import 'firebase/compat/firestore';

import CommonPost from '../components/CommonPost';

function MyPosts() {
    const [posts, setPosts] = React.useState([]);
    React.useEffect(() => {
        // 用where去找
        firebase.firestore().collection('posts').where('author.uid', '==', firebase.auth().currentUser.uid).get().then((collectionSnapshot) => {
            const data = collectionSnapshot.docs.map(doc => {
                const id = doc.id
                return { ...doc.data(), id }
            })
            setPosts(data)
        })
    }, [])
    return <>
        <Header>我的文章</Header>
        <Item.Group>
            {posts.map(post => {
                return <CommonPost post={post} key={post.id} />
            })}
        </Item.Group>
    </>
}
export default MyPosts