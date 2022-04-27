import React from 'react';
import styles from './home.module.css'
import Img from '../../assets/imag.png'
import {Link} from 'react-router-dom'
import Section from "./Section/Section";


const Home = () => {

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
                            <p className={styles.enter}>Войти</p>
                            <button className={styles.cart}>Корзина | 1</button>
                        </div>
                        
                    </div>
                    <img src={Img} alt=""/>
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