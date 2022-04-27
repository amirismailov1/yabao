import React from 'react';
import {Route, Routes, useLocation} from 'react-router-dom'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Home from "../pages/Home/Home";
import Orders from "../pages/Orders/Orders";
import Account from "../pages/Account/Account";
import Login from "../pages/Login/Login";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import Menu from "../pages/Menu/Menu";



const Layout = () => {

    const location = useLocation();
    return (
        <div>
            {location.pathname.includes('login') || location.pathname.includes('register') ? '' : <Header/>}

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/menu/:category' element={<Menu/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/account' element={<Account/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<NotFound/>}/>
                <Route path='/register' element={<Register/>}/>

            </Routes>
            {location.pathname.includes('login') || location.pathname.includes('register') ? '' : <Footer/>}
        </div>
    );
};

export default Layout;