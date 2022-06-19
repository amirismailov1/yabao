import React from 'react';
import styles from './home.module.css'
import Img from '../../assets/imag.png'

import Section from "./Section/Section";



import {useDispatch, useSelector} from "react-redux";





const Home = () => {


    return (
        <>
            <section id='home' className={styles.home}>

                <div className="container">
                    <img className={styles.img} src={Img} alt=""/>
                </div>

            </section>

            <Section  title='Суши' path='sushi'/>
            <Section title='Сеты' path='set'/>
            <Section title='Супы' path='soup'/>
            <Section title='Добавки и соусы' path='sous'/>
            <Section title='Напитки' path='drinks'/>
            <Section title='Закуски' path='snacks'/>


        </>
    );
};

export default Home;