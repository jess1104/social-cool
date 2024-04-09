import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Header"
import Login from './pages/Login'
import Posts from './pages/Posts'
import NewPost from './pages/NewPost'
import Post from './pages/Post'

function App() {
    return <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<Posts />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/new-post' element={<NewPost />}></Route>
            <Route path='/posts/:postId' element={<Post />}></Route>
        </Routes>
    </BrowserRouter>
}

export default App