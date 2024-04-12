import React from 'react';
import { List } from 'semantic-ui-react'
import { Link, useLocation } from 'react-router-dom';
import firebase from '../utils/firebase';
import 'firebase/compat/firestore';


function Topics() {
    const location = useLocation()
    // console.log('lo', location);
    const urlSearchParams = new URLSearchParams(location.search)
    const currentTopic = urlSearchParams.get('topic')
    const [topics, setTopics] = React.useState([])
    React.useEffect(() => {
        // 
        firebase.firestore().collection('topics').get().then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data())
            setTopics(data)
        })
    }, [])
    return <List animated selection>
        {topics.map(topic => <List.Item key={topic.name} as={Link} to={`/?topic=${topic.name}`} active={currentTopic === topic.name}>
            {topic.name}
        </List.Item>)}
    </List>
}

export default Topics