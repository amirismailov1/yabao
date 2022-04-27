import React from 'react';
import styles from './card.module.css'
import {LazyLoadImage} from "react-lazy-load-image-component";

const Card = ({item}) => {
    return (
        <div className={styles.card}>
            <LazyLoadImage className={styles.cardImg} src={item.image} alt=""/>
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <p className={styles.cardSubtitle}>{item.composition}</p>
            <div className={styles.cardBlock}>
                <p className={styles.cardPrice}>от {item.price} C</p>
                <button type='button' className={styles.cardBtn}>В корзину</button>
            </div>
        </div>
    );
};

export default Card;