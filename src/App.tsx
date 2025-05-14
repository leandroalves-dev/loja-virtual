import './App.css'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Sale from './pages/Sale'
import Contact from './pages/Contact'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import Category from './pages/Category';
import ProductDetails from './pages/ProductDetails';
import { FavoritesProvider } from './context/FavoritesContext';
import Favorites from './pages/Favorites';
import Tags from './pages/Tags';

function App() {
    return (
    <FavoritesProvider>
        <div className='min-h-screen flex flex-col'>
            <BrowserRouter>
                <Header />
                <main className='bg-neutral-900 flex-1'>
                    <Routes>
                        <Route path='/' element={<Home />}></Route>
                        <Route path='/about' element={<About />}></Route>
                        <Route path='/products' element={<Products />}></Route>
                        <Route path='/sale' element={<Sale />}></Route>
                        <Route path='/contact' element={<Contact />}></Route>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/register' element={<Register />}></Route>
                        <Route path='/forgot-password' element={<ForgotPassword />}></Route>
                        <Route path='/category/:category' element={<Category />} />
                        <Route path='/product/:id' element={<ProductDetails />} />
                        <Route path="/favorites" element={<Favorites />} />
                        <Route path="/tags/:tags" element={<Tags />} />
                    </Routes>
                </main>
                <Footer />
            </BrowserRouter>
            </div>
        </FavoritesProvider>
    )
}

export default App
