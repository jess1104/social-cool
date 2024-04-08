import React from 'react';
import { List } from 'semantic-ui-react'
import firebase from '../utils/firebase';
import 'firebase/compat/firestore';


function Topics() {
    const [topics, setTopics] = React.useState([])
    React.useEffect(() => {
        // 
        firebase.firestore().collection('topics').get().then((querySnapshot) => {
            console.log('querySnapshot', querySnapshot);
            const data = querySnapshot.docs.map((doc) => doc.data())
            setTopics(data)
        })
    }, [])
    return <List animated selection>
        {topics.map(topic => <List.Item key={topic.name}>
            {topic.name}
        </List.Item>)}
    </List>
}

export default Topics