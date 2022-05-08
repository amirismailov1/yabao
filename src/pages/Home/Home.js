import React from 'react';
import styles from './home.module.css'
import Img from '../../assets/imag.png'
import {Link} from 'react-router-dom'
import Section from "./Section/Section";

import {useDispatch, useSelector} from "react-redux";

import Cart from "./Cart/Cart";
import {openCart} from "../../redux/reducers/cart/cart";
import {BiUserCircle} from 'react-icons/bi'



const Home = () => {
    const user = useSelector((s) => s.user.user );
    const cart = useSelector((s)=>s.cart.cart);
    const dispatch=useDispatch();

    return (
        <>
            <section className={styles.home}>

                <div className="container">
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
                    <img className={styles.img} src={Img} alt=""/>
                </div>
            </section>
            <Section title='Суши' path='sushi'/>
            <Section title='Сеты' path='set'/>
            <Section title='Супы' path='soup'/>
            <Section title='Добавки и соусы' path='sous'/>
            <Section title='Напитки' path='drinks'/>
            <Section title='Закуски' path='snacks'/>

        </>
    );
};

export default Home;