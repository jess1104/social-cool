import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./Header"
import Login from './pages/Login'


function App() {
    return <BrowserRouter>
        <Header />
        <Routes>
            <Route path='/' element='首頁'></Route>
            <Route path='/login' element={<Login />}></Route>
        </Routes>
    </BrowserRouter>
}

export default App