import React from 'react';
import img from './notfound.jpg'
import styles from './notFound.module.css'



const NotFound = () => {
    return (
        <section className={styles.notFound}>
            <img className={styles.img} src={img} alt="404 Not Found"/>
        </section>
    );
};

export default NotFound;