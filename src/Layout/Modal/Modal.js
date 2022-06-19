import React from 'react';
import styles from './modal.module.css'
import {useDispatch,useSelector} from "react-redux";
import {addCard} from "../../redux/reducers/cart/cart";
import {close} from "../../redux/reducers/Modal/modal";
import {AiOutlineClose} from "react-icons/ai";

const Modal = () => {
    const obj = useSelector((store)=> store.modal.product);
    const open = useSelector((store)=> store.modal.open);
    const dispatch = useDispatch();
    const closeModal = (e) =>{
        if (e.target.className === styles.modal){
            dispatch(close())
        }
    }
    return (
        <div className={open?`${styles.modal}`:` ${styles.modalNon} `} onClick={closeModal} >
<div className="container">
<div className={styles.info}>
    <div className={styles.content}>
        <img className={styles.img} src={obj.image} alt=""/>
        <div className={styles.right}>
            <h4 className={styles.title}>{obj.title}</h4>
            <p className={styles.comp}>{obj.composition}</p>
            <div className={styles.block}>
                <p className={styles.price}>{obj.price} руб</p>

            </div>

        </div>
    </div>
    <button type='button' className={styles.btn} onClick={()=> {
        dispatch(addCard(obj));
        dispatch(close())
    }}>Заказать</button>
    <span className={styles.btnClose} onClick={()=>dispatch(close())}><AiOutlineClose className={styles.close}/></span>
</div>




</div>


        </div>
    );
};

export default Modal;