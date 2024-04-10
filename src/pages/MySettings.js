import React from 'react'
import { Header, Button, Segment, Modal, Input } from 'semantic-ui-react'

import firebase from '../utils/firebase'

function MyName() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [displayName, setDisplayName] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)
    const user = firebase.auth().currentUser || {};

    function onSubmit() {
        setIsLoading(true)
        user.updateProfile({
            displayName,
        }).then(() => {
            setIsLoading(false)
            setDisplayName('')
            setIsModalOpen(false)
        })
    }
    return <>
        <Header size='small'>
            會員名稱
            <Button floated='right' onClick={() => setIsModalOpen(true)}>修改</Button>
        </Header>
        <Segment vertical>{user.displayName}</Segment>
        <Modal open={isModalOpen} size='mini'>
            <Modal.Header>修改會員名稱</Modal.Header>
            <Modal.Content>
                <Input
                    placeholder="輸入新的會員名稱"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    fluid
                />
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => setIsModalOpen(false)} >取消</Button>
                <Button onClick={onSubmit} loading={isLoading}>修改</Button>
            </Modal.Actions>
        </Modal>
    </>
}

function MySettings() {

    return <>
        <Header>會員資料</Header>
        <MyName />
    </>
}

export default MySettings