import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Header"
import Login from './pages/Login'
import Post from './pages/Post'
import NewPost from './pages/NewPost'

function App() {
    return <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element={<Post />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/new-post' element={<NewPost />}></Route>
        </Routes>
    </BrowserRouter>
}

export default App