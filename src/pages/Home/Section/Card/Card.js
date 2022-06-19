import React, {useState} from 'react';
import styles from './card.module.css'
import {LazyLoadImage} from "react-lazy-load-image-component";
import Modal from "../../../../Layout/Modal/Modal";
import {useDispatch} from "react-redux";
import {addCard} from "../../../../redux/reducers/cart/cart";
import {open} from "../../../../redux/reducers/Modal/modal";

const Card = ({item}) => {

    const dispatch=useDispatch();

    return (
       <>
           <div className={styles.card}>
               <LazyLoadImage
                   className={styles.cardImg} src={item.image} onClick={()=>dispatch(open(item))} alt=""/>
               <div className={styles.cardColumn}>
                   <h4 className={styles.cardTitle}>{item.title}</h4>
                   <p className={styles.cardSubtitle}>{item.composition.slice(0,56)}</p>
                   <div className={styles.cardBlock}>
                       <p className={styles.cardPrice}>{item.price} руб.</p>

                       <button type='button' className={styles.cardBtn} onClick={()=> dispatch(addCard(item))}>В корзину</button>


                   </div>
               </div>

           </div>

       </>

    );
};

export default Card;