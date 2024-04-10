import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
// Grid會自動分成16等份，要用width={num}去劃分等份
import { Grid, Item, Image, Icon, Container } from 'semantic-ui-react'
import Header from "./Header"
import Login from './pages/Signin'
import Posts from './pages/Posts'
import NewPost from './pages/NewPost'
import Post from './pages/Post'
import Topics from './components/Topics'

function App() {
    return <BrowserRouter>
        <Header />
        <Routes>
            <Route exact path="/" element={<PostViewLayout />}>
                <Route path="/" element={<Posts />} exact />
                <Route path="/:postId" element={<Post />} exact />
            </Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/new-post' element={<NewPost />}></Route>
            <Route path='/my' element={<PostViewLayout isMember />}>
                <Route path="/my/posts" element={'我的文章'} exact />
                <Route path="/my/collections" element={'我的收藏'} exact />
                <Route path="/my/settings" element={'我的收藏'} exact />
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
                        {isMember ? '會員選單' : <Topics />}
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