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
import { AuthProvider } from './context/AuthContext';
import EditProfile from './pages/EditProfile';
import PrivateRoute from './components/PrivateRoute';
import { CartProvider } from './context/CartContext';
import Checkout from './components/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import OrderHistory from './pages/OrderHistory';


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>
                    <FavoritesProvider>
                    
                        <div className='min-h-screen flex flex-col'>
                            
                                <Header />
                                <main className='bg-neutral-900 flex-1 pb-12'>
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
                                        <Route path="/edit-profile" element={<PrivateRoute><EditProfile /></PrivateRoute>} />
                                        <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                                        <Route path="/order-success" element={<PrivateRoute><OrderSuccess /></PrivateRoute>} />
                                        <Route path="/my-orders" element={<PrivateRoute><OrderHistory /></PrivateRoute>} />
                                    </Routes>
                                </main>
                                
                                <Footer />
                            
                        </div>
                    
                    </FavoritesProvider>
                </CartProvider>
            </AuthProvider>
        </BrowserRouter>
        
    )
}

export default App
