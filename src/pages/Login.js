import React from 'react'
import { Menu, Form, Container } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import 'firebase/compat/auth';
import firebase from '../utils/firebase'


function Login() {
    const navigate = useNavigate();
    const [activeItem, setActiveItem] = React.useState('register');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    // 送出
    function onSubmit() {
        if (activeItem === 'register') {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
                navigate('/')
            })
        } else if (activeItem === 'login') {
            firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                navigate('/')
            })
        }
    }

    return (<Container>
        <Menu widths={2}>
            <Menu.Item active={activeItem === 'register'} onClick={() => setActiveItem('register')}>註冊</Menu.Item>
            <Menu.Item active={activeItem === 'login'} onClick={() => setActiveItem('login')}>登錄</Menu.Item>
        </Menu>
        <Form onSubmit={onSubmit}>
            <Form.Input label='信箱' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='請輸入信箱' />
            <Form.Input label='密碼' type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='請輸入密碼' />
            <Form.Button>
                {activeItem === 'register' && '註冊'}
                {activeItem === 'login' && '登錄'}
            </Form.Button>
        </Form>
    </Container>)
}

export default Login