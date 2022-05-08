import React from 'react';
import styles from './modal.module.css'
import {useDispatch} from "react-redux";
import {addCard} from "../../../../../redux/reducers/cart/cart";

const Modal = ({item,setModal,modal}) => {
    const closeModal = (e) =>{
        if (e.target.className=== styles.modal){
            setModal(false)
        }
    };
    const dispatch=useDispatch();
    return (
        <div className={modal?`${styles.modal}`:` ${styles.modalNon} `} onClick={closeModal} >
<div className="container">
<div className={styles.info}>
    <div className={styles.content}>
        <img className={styles.img} src={item.image} alt=""/>
        <div className={styles.right}>
            <h4 className={styles.title}>{item.title}</h4>
            <p className={styles.comp}>{item.composition}</p>
            <div className={styles.block}>
                <p className={styles.price}>{item.price} сом</p>

            </div>

        </div>
    </div>
    <button type='button' className={styles.btn} onClick={()=> dispatch(addCard(item))}>Заказать</button>
    <span className={styles.close} onClick={()=>setModal(false)}>X</span>
</div>




</div>


        </div>
    );
};

export default Modal;