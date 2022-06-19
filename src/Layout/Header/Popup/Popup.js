import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import styles from './popup.module.css'
import axios from "axios";
import {AiOutlineClose} from 'react-icons/ai'

const Popup = ({isOpen,setIsOpen}) => {

    const {
        register,
        handleSubmit,
        reset
    } = useForm();
    const [success,setSuccess] = useState(false);
    const closePopup = (e) =>{
        if (e.target.className=== styles.layout){
            setIsOpen(false)
        }
    };


    const sendData = (data) =>{
        axios.post('http://localhost:8080/call' , data)
            .then(()=>setSuccess(true))
            .catch(({err})=>console.log(err));
reset();
 setTimeout(()=>{
     setIsOpen(false)
 },2000)

    };
    const handleKeyPress = target =>{
        if(target.charCode === 'ENTER_KEY'){
            sendData()
        }
    }




    return (
        <div className={isOpen? `${styles.layout}` : `${styles.layoutNon}`} onClick={closePopup} >
            <form className={styles.form} onKeyPress={handleKeyPress} onSubmit={handleSubmit(sendData)}>
                <h4 className={styles.title}>Заполните форму и мы вам перезвоним</h4>
                <div className={styles.block}>
                    <label className={styles.label} htmlFor="name">Имя</label>
                    <input className={styles.input} {...register('name')} type="text"/>
                </div>
                <div className={styles.block}>
                    <label className={styles.label} htmlFor="tel">Телефон</label>
                    <input className={styles.input} {...register('tel')} required type="tel"/>
                </div>
                <button type="submit" className={styles.btn}>Отправить</button>
                <p className={styles.message} style={{display:success?'block':'none'}} >Спасибо за ваше сообщение.Оно успешно отправлено</p>

                <span className={styles.btnClose} onClick={()=>setIsOpen(false)}><AiOutlineClose className={styles.close}/></span>

            </form>
        </div>
    );
};

export default Popup;