import React from 'react';
import { Item } from 'semantic-ui-react'
import firebase from '../utils/firebase'
import 'firebase/compat/firestore';

import CommonPost from '../components/CommonPost';
import { useLocation } from 'react-router-dom';

function Posts() {
    const [posts, setPosts] = React.useState([]);
    const location = useLocation()
    // console.log('lo', location);
    const urlSearchParams = new URLSearchParams(location.search)
    const currentTopic = urlSearchParams.get('topic')
    React.useEffect(() => {
        if (currentTopic) {
            // 用where去找對應的主題
            firebase.firestore().collection('posts').where('topic', '==', currentTopic).get().then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(doc => {
                    const id = doc.id
                    return { ...doc.data(), id }
                })
                setPosts(data)
            })
        } else {
            firebase.firestore().collection('posts').get().then((collectionSnapshot) => {
                const data = collectionSnapshot.docs.map(doc => {
                    const id = doc.id
                    return { ...doc.data(), id }
                })
                setPosts(data)
            })
        }
    }, [currentTopic])
    return <Item.Group>
        {posts.map(post => {
            return <CommonPost post={post} key={post.id} />
        })}
    </Item.Group>
}
export default Posts