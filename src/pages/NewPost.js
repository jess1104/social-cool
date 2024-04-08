import { Container, Header, Form, Image, Button } from 'semantic-ui-react'
import React from 'react'
import firebase from '../utils/firebase';
import 'firebase/compat/firestore';


function NewPost() {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    // 主題分類
    const [topics, setTopics] = React.useState([])
    const [topicName, setTopicName] = React.useState('')
    const [file, setFile] = React.useState('')
    React.useEffect(() => {
        firebase.firestore().collection('topics').get().then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data())
            setTopics(data)
        })
    }, [])


    const options = topics.map((topic) => { return { text: topic.name, value: topic.name } })
    // 預覽圖片
    const previewUrl = file ? URL.createObjectURL(file) : 'https://react.semantic-ui.com/images/wireframe/image.png'
    return <Container>
        <Header>發表文章</Header>
        <Form>
            <Image src={previewUrl} size='medium' floated='left' />
            <Button basic as='label' htmlFor="post-image">上傳文章圖片</Button>
            <Form.Input type='file' id='post-image' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
            <Form.Input placeholder="輸入文章標題" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Form.TextArea placeholder="輸入文章內容" value={content} onChange={(e) => setContent(e.target.value)} />
            {/* Dropdown 下拉選單的onChange有第二個參數可以直接拿value */}
            <Form.Dropdown placeholder="選擇文章主題" options={options} selection value={topicName} onChange={(e, { value }) => setTopicName(value)} />
            <Form.Button>送出</Form.Button>
        </Form>
    </Container>
}

export default NewPost