import React from 'react';
import { Item, Image, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import firebase from '../utils/firebase'
import 'firebase/compat/firestore';

import CommonPost from '../components/CommonPost';

function Posts() {
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
    return <Item.Group>
        {posts.map(post => {
            return <CommonPost post={post} />
        })}
    </Item.Group>
}
export default Posts