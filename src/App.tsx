import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Offers from './pages/Offers'
import Contact from './pages/Contact'

function App() {
    return (
        <div className='min-h-screen flex flex-col'>
            <BrowserRouter>
                <Header />
                <main className='bg-neutral-900 flex-1'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route path='/products' element={<Products />}></Route>
                        <Route path='/offers' element={<Offers />}></Route>
                        <Route path='/contact' element={<Contact />}></Route>
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
        </div>
    )
}

export default App
