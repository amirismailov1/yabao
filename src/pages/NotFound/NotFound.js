import React from 'react';
import {Link} from 'react-router-dom'
import styles from './notFound.module.css'



const NotFound = () => {
    return (
        <section className={styles.notFound}>

            <h4 className={styles.title}>404</h4>
            <p className={styles.sub}>Страница не найдена :(</p>
            <button  className={styles.btn} type='button'><Link to={'/'}>На главную</Link></button>
        </section>
    );
};

export default NotFound;