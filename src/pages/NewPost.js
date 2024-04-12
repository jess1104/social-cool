import { Container, Header, Form, Image, Button } from 'semantic-ui-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from '../utils/firebase';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';



function NewPost() {
    const navigate = useNavigate()
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    // 主題分類
    const [topics, setTopics] = React.useState([])
    const [topicName, setTopicName] = React.useState('')
    const [file, setFile] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    React.useEffect(() => {
        firebase.firestore().collection('topics').get().then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => doc.data())
            setTopics(data)
        })
    }, [])


    const options = topics.map((topic) => { return { text: topic.name, value: topic.name } })
    // 預覽圖片
    const previewUrl = file ? URL.createObjectURL(file) : 'https://react.semantic-ui.com/images/wireframe/image.png'

    // 送出表單
    function onSubmit() {
        setIsLoading(true)
        const documentRef = firebase.firestore().collection('posts').doc();
        // 上傳圖片至storage
        const fileRef = firebase.storage().ref('post-images/' + documentRef.id)
        const metadata = { contentType: file.type }
        fileRef.put(file, metadata).then(() => {
            // 再拿到上傳上去的圖片
            fileRef.getDownloadURL().then((imageUrl) => {
                // 塞入資料set
                documentRef.set({
                    title,
                    content,
                    topic: topicName,
                    // 會拿到當下時間
                    createdAt: firebase.firestore.Timestamp.now(),
                    author: {
                        displayName: firebase.auth().currentUser.displayName || '',
                        photoURL: firebase.auth().currentUser.photoURL || '',
                        uid: firebase.auth().currentUser.uid,
                        email: firebase.auth().currentUser.email
                    },
                    imageUrl
                }).then((res) => {
                    console.log('res', res);
                    setIsLoading(false)
                    navigate('/')
                })
            })
        })
    }
    return <Container>
        <Header>發表文章</Header>
        <Form onSubmit={onSubmit}>
            <Image src={previewUrl} size='medium' floated='left' />
            <Button basic as='label' htmlFor="post-image">上傳文章圖片</Button>
            <Form.Input type='file' id='post-image' style={{ display: 'none' }} onChange={(e) => setFile(e.target.files[0])} />
            <Form.Input placeholder="輸入文章標題" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Form.TextArea placeholder="輸入文章內容" value={content} onChange={(e) => setContent(e.target.value)} />
            {/* Dropdown 下拉選單的onChange有第二個參數可以直接拿value */}
            <Form.Dropdown placeholder="選擇文章主題" options={options} selection value={topicName} onChange={(e, { value }) => setTopicName(value)} />
            <Form.Button loading={isLoading}>送出</Form.Button>
        </Form>
    </Container>
}

export default NewPost