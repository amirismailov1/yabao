import React, {useEffect, useState} from 'react';
import Logo from  "../../assets/Logo.png"
import styles from './header.module.css';
import {HiArrowUp} from "react-icons/hi";
import {Link} from 'react-router-dom'
import Popup from "./Popup/Popup";
import {openCart} from "../../redux/reducers/cart/cart";
import Cart from "../../pages/Home/Cart/Cart";

import {BiUserCircle} from 'react-icons/bi'
import {useDispatch, useSelector} from "react-redux";



const Header = () => {
    const [y, setY] = useState(0);
    const user = useSelector((s) => s.user.user );
    const cart = useSelector((s)=>s.cart.cart);
    const dispatch=useDispatch();

    const handleNavigation = (e) => {
        const window = e.currentTarget;
        if (200 < window.scrollY) {
            setY(1)
        } else {
            setY(0)
        }
    };
    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", (e) => handleNavigation(e));
    }, []);
 const [isOpen,setIsOpen] = useState(false);
    return (
        <header id="header" className={styles.header}>
            <div className="container">
                <div className={styles.top}>
                    <div>
                        <Link className={styles.logo} to={'/'}>
                            <img  className={styles.logoImg} src={Logo} alt="YA BAO"/>
                            <div className={styles.logoText}>
                                <h1 className={styles.title}>YA BAO</h1>
                                <p className={styles.subtitle}>Дух китайской еды</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.info}>
                        <h3 className={styles.infoTitle}>
                            Доставка еды <span className={styles.infoTitlePink}>Бишкек</span>
                        </h3>
                        <div className={styles.infoTime}>Время доставки
                            <p className={styles.infoCircle}>

                        </p>  от 31 мин</div>
                    </div>
                    <div className={styles.call}>
                        <button className={styles.btn} type="button" onClick={()=>setIsOpen(true)}>Заказать звонок</button>
                        <a href='tel:+996555555555' className={styles.number}>
                           +996 (555) 55 55 55
                        </a>
                    </div>


                </div>

                <div className={styles.row}>

                    <ul className={styles.list}>
                        <li className={styles.item}>
                            <Link className={styles.link} to={'/menu/sushi'}>Суши</Link>
                        </li>
                        <li className={styles.item}>
                            <Link className={styles.link} to={'/menu/set'}>Сеты</Link>
                        </li>
                        <li className={styles.item}>
                            <Link className={styles.link} to={'/menu/soup'}>Супы</Link>
                        </li>
                        <li className={styles.item}>
                            <Link className={styles.link} to='/menu/sous'>Добавки и соусы</Link>
                        </li>
                        <li className={styles.item}>
                            <Link className={styles.link} to={'/menu/drinks'}>Напитки</Link>
                        </li>
                        <li className={styles.item}>
                            <Link className={styles.link} to={'/menu/snacks'}>Закуски</Link>
                        </li>
                    </ul>
                    <div className={styles.right}>
                        <Link   to={user.email.length?'/account':'/login'} className={styles.user}>
                            <span className={styles.userIcon}><BiUserCircle/></span>
                            <div>
                                <h4 className={styles.userTitle}>Личный кабинет</h4>
                                <p className={styles.userSub}>{user.email.length?`${user.login}`:'Вход'} </p>

                            </div>
                        </Link>
                        <div className={styles.cartBlock}>
                            <button className={styles.cart} onClick={()=> dispatch(openCart())} type='button'>Корзина | {cart.reduce((acc,rec)=>acc+rec.count,0)}</button>
                            <Cart/>
                        </div>

                    </div>

                </div>


            </div>
            <Popup isOpen={isOpen} setIsOpen={setIsOpen}/>
            <a href={"#header"} className={`${styles.goTop} ${y? styles.goTop_active : ''}`}>
                <HiArrowUp/>
            </a>
        </header>
    );
};

export default Header;