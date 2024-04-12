import React from 'react'
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
// Grid會自動分成16等份，要用width={num}去劃分等份
import { Grid, Container } from 'semantic-ui-react'
import firebase from './utils/firebase'

import Header from "./Header"
import Login from './pages/Signin'
import Posts from './pages/Posts'
import MyPosts from './pages/MyPosts'
import MyCollections from './pages/MyCollections'
import MySettings from './pages/MySettings'
import NewPost from './pages/NewPost'
import Post from './pages/Post'
import Topics from './components/Topics'
import MyMenu from './components/MyMenu'

function App() {
    const [user, setUser] = React.useState(null);
    React.useEffect(() => {
        // 檢查有無登入
        firebase.auth().onAuthStateChanged((curUser) => {
            setUser(curUser);
        })
    }, [])
    return <BrowserRouter>
        <Header user={user} />
        <Routes>
            {/* 巢狀 */}
            <Route exact path="/" element={<PostViewLayout />}>
                <Route path="/" element={<Posts />} exact />
                <Route path="/:postId" element={<Post user={user} />} exact />
            </Route>
            <Route path='/login' element={user ? <Navigate to='/' replace /> : <Login />}></Route>
            <Route path='/new-post' element={user ? <NewPost /> : <Navigate to='/' replace />}></Route>
            {/* 會員頁面的巢狀 */}
            <Route path='/' element={user ? <PostViewLayout isMember /> : <Navigate to='/' replace />}>
                <Route path="/my/posts" element={<MyPosts />} exact />
                <Route path="/my/collections" element={<MyCollections />} exact />
                <Route path="/my/settings" element={<MySettings user={user} />} exact />
            </Route>
        </Routes>
    </BrowserRouter>
}

const PostViewLayout = ({ isMember }) => {
    // 巢狀路由可以用<Outlet />有點像vue的slot
    return (
        <Container>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        {isMember ? <MyMenu /> : <Topics />}
                    </Grid.Column>
                    <Grid.Column width={10}>
                        <Outlet />
                    </Grid.Column>
                    <Grid.Column width={3}>空白</Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default App