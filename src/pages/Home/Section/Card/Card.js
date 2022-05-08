import React, {useState} from 'react';
import styles from './card.module.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import Modal from "./Modal/Modal";
import {useDispatch} from "react-redux";
import {addCard} from "../../../../redux/reducers/cart/cart";

const Card = ({item}) => {
    const [modal,setModal] = useState(false);
    const dispatch=useDispatch();
    return (
        <div className={styles.card}>
            <LazyLoadImage  className={styles.cardImg} src={item.image} onClick={()=>setModal(true)} alt=""/>
            <h4 className={styles.cardTitle}>{item.title}</h4>
            <p className={styles.cardSubtitle}>{item.composition.slice(0,56)}</p>
            <div className={styles.cardBlock}>
                <p className={styles.cardPrice}>от {item.price} C</p>
                <button type='button' className={styles.cardBtn} onClick={()=> dispatch(addCard(item))}>В корзину</button>
            </div>
            <Modal  modal={modal} setModal={setModal} item={item}/>
        </div>
    );
};

export default Card;