import { Menu, Search } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import React from 'react'

import firebase from './utils/firebase'

function Header({ user }) {
    return <Menu>
        <Menu.Item as={Link} to="/">Social Web</Menu.Item>
        <Menu.Item><Search /></Menu.Item>
        <Menu.Menu position='right'>
            {
                user ? (
                    <>
                        <Menu.Item as={Link} to="/new-post">發表文章</Menu.Item>
                        <Menu.Item as={Link} to="/my/posts">會員</Menu.Item>
                        <Menu.Item as={Link} onClick={() => firebase.auth().signOut()}>登出</Menu.Item>
                    </>
                ) : (
                    <Menu.Item as={Link} to="/login">註冊/登入</Menu.Item>
                )
            }
        </Menu.Menu>
    </Menu>
}

export default Header