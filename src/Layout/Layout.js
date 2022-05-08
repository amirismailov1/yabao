import React, {useEffect} from 'react';
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
import {useDispatch} from "react-redux";
import {getLocalStorage} from "../redux/reducers/user/user";
import {useSelector} from "react-redux";
import {getCartLocalStorage} from "../redux/reducers/cart/cart";

const Layout = () => {
    const cart = useSelector(store=> store.cart.cart);
    const dispatch=useDispatch();
    useEffect(() => {
        if (localStorage.getItem('user') !== null){
            dispatch(getLocalStorage())
        }




    },[]);
    useEffect(() => {
        if (localStorage.getItem('cart') !== null){
            dispatch(getCartLocalStorage())
        }


    },[]);
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart]);

    const location = useLocation();
    return (
        <div>
            {location.pathname.includes('menu') || location.pathname.includes('orders') || location.pathname.includes('account') ||location.pathname === '/'  ?   <Header/> :''}

            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/menu/:category' element={<Menu/>}/>
                <Route path='/orders' element={<Orders/>}/>
                <Route path='/account' element={<Account/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='*' element={<NotFound/>}/>
                <Route path='/register' element={<Register/>}/>

            </Routes>
            {location.pathname.includes('menu') || location.pathname.includes('orders') || location.pathname.includes('account') ||location.pathname === '/'  ?   <Footer/> :''}
        </div>
    );
};

export default Layout;