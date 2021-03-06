import React, {useState} from 'react';
import styles from './order.module.css'
import {useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import {addCard, clearCart, deleteCard, removeCard} from "../../redux/reducers/cart/cart";
import {useDispatch, useSelector} from "react-redux";
import {changeAccount} from "../../redux/reducers/user/user";
import { v4 as uuidv4 } from 'uuid';
import {TiTick} from 'react-icons/ti'
import {type} from "@testing-library/user-event/dist/type";

const Orders = () => {

    const cart = useSelector((store)=> store.cart.cart);
    const dispatch = useDispatch();
    const user = useSelector(store=>store.user.user);
    const navigate = useNavigate();
    const [popup,setPopup] = useState(false);
    const [points,setPoints] = useState(0);

    const {
        register,
        formState : {
            errors
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur"
    });

    const createOrder = (data) => {

        const toDate = (date) => {
            return new Intl.DateTimeFormat('ru-Ru', {
                day:'2-digit',
                month:'2-digit',
                year:'numeric'
            }).format(new Date(date))
        };
        dispatch(changeAccount({
            bonus: user.bonus+Math.ceil((cart.reduce((acc, rec) => acc + rec.price*rec.count, 0)-points) / 100 * 3) - data.points,
            order:
                [...user.order,{
                    ...data,
                    info: data.info ? data.info : 'no info',
                    products: cart,
                    prePrice: cart.reduce((acc, rec) => acc + rec.price*rec.count , 0),
                    discount: data.points,
                    price:cart.reduce((acc, rec) => acc + rec.price*rec.count , 0) - data.points,

                    change: data.money - cart.reduce((acc, rec) => acc + rec.price*rec.count , 0) - data.points,
                    date: toDate(new Date()),
                    id:uuidv4()
                }]

        },user));
        dispatch(clearCart());
        setPopup(true);
        setTimeout((()=>{
            setPopup(false);
            navigate('/');
            reset()
        }),2500);
        

    };





    return (
        <section className={styles.order}>
            <div className="container">
                <h2 className={styles.title}>???????????????????? ????????????</h2>

                <div className={styles.row}>
                    <form  className={styles.form} onSubmit={handleSubmit(createOrder)}>
                        <div className={styles.formItem}>
                            <label className={styles.formLabel} htmlFor="name">?????? *</label>
                            <input defaultValue={user.login} {...register('name', {
                                required : '?????? ???????? ?????????????????????? ?????? ????????????????????',
                                minLength: {
                                    value: 2,
                                    message: '?????????????? 2 ??????????????'
                                }
                            })} className={styles.formInput} type="text" />
                        </div>
                        <span className={styles.error}>
                         {errors?.name && errors?.name?.message }
                    </span>
                        <div className={styles.formItem}>
                            <label className={styles.formLabel} htmlFor="tel">?????????????? *</label>
                            <input defaultValue={user.tel} {...register('tel', {
                                required: "???????? ?????????????????????? ?? ????????????????????",
                                pattern: {
                                    value: '/^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/',
                                    message: "Invalid phone no",
                                }
                            })}  className={styles.formInput} type="tel" />
                        </div>
                        <span className={styles.error}>
                         {errors?.tel && errors?.tel?.message }
                    </span>

                        <div className={styles.formItem}>
                            <label className={styles.formLabel} htmlFor="street">?????????? *</label>
                            <input defaultValue={user.street} {...register('street', {
                                required : '?????? ???????? ?????????????????????? ?????? ????????????????????',
                                minLength: {
                                    value: 2,
                                    message: '?????????????? 2 ??????????????'
                                }
                            })} className={styles.formInput} type="text" />
                        </div>
                        <span className={styles.error}>
                         {errors?.street && errors?.street?.message }
                    </span>
                        <div className={styles.formItem}>
                            <label className={styles.formLabel} htmlFor="info">???????????????????????????? ???????????????????? </label>
                            <textarea {...register('info')} className={styles.formTextArea} />
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.formLabel} htmlFor="pay">???????????? ???????????? *</label>
                            <select {...register('pay')} className={styles.formSelect}>
                                <option value="??????????????????">??????????????????</option>
                                <option value="????????????">???????????? ??????????????</option>

                            </select>
                        </div>
                        <div className={styles.formItem}>
                            <label className={styles.formLabel} htmlFor="money">???????????????? ?????????? *</label>
                            <input defaultValue={cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0)} {...register('money', {
                                required : '?????? ???????? ?????????????????????? ?????? ????????????????????',
                                min : {
                                    value: cart.reduce((acc,rec)=> acc+rec.price,0)-points,
                                    message:`???????? ?????????? ???? ???????????? ???????? ???????????? ${(cart.reduce((acc,rec)=> acc+rec.price*rec.count,0))-points}`
                                }
                            })}  className={styles.formInput} type="number" />
                        </div>
                        <span className={styles.error}>
                         {errors?.money && errors?.money?.message }
                    </span>
                        <div className={styles.formItem}>
                            <label className={styles.formLabel} htmlFor="points">???????????????????????? ??????????</label>
                            <input  onChangeCapture={(e)=>{
                                if (+e.target.value <= Math.ceil(cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0)/2) && 0<+e.target.value<=user.bonus && +e.target.value>0){
                                    setPoints(+e.target.value)
                                }else {setPoints(0)}

                            }
                            } max={Math.ceil(cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0)/2)} className={styles.formInput} type="number" defaultValue={0} {...register('points',{
                                max:{
                                    value:(cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0))%2? (cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0))/2 :(cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0))/2 -1
                                    &&
                                        user.bonus

                                    ,
                                    message:`???????????????????????? ????????????.?? ?????????????? : ${user.bonus}`

                                },

                            })}/>
                        </div>
                        <span className={styles.error}>
                         {errors?.points && errors?.points?.message }
                    </span>
                        <div className={styles.formItem}>
                            <label className={styles.formLabel} htmlFor="checkbox">?? ?????????????????? ???????????????? ???????????????? *</label>

                                <input {...register('checkbox', {
                                    required : '?????? ???????? ?????????????????????? ?????? ????????????????????'
                                })}  className={styles.checkbox} type="checkbox" />


                        </div>
                        <span className={styles.error}>
                         {errors?.checkbox && errors?.checkbox?.message }
                    </span>

                        <button type='submit' className={styles.formBtn}>????????????????</button>
                    </form>
                    <div className={styles.right}>
                        <ul className={styles.list}>
                            {cart &&  cart.map((el) => (
                                <li key={el.id} className={styles.item}>
                                    <img className={styles.itemImg} src={el.image} alt=""/>
                                    <div className={styles.itemCenter}>
                                        <h4 className={styles.itemTitle}>{el.title}</h4>
                                        <p className={styles.itemPrice}>{el.price * el.count} ??????.</p>
                                        <div className={styles.itemCount}>
                                            <button className={styles.itemCountBtn} type='button' onClick={()=>dispatch(removeCard( el.title))}>-</button>
                                            <span> {el.count} </span>
                                            <button className={styles.itemCountBtn} type='button' onClick={()=>dispatch(addCard(el))}>+</button>
                                        </div>
                                    </div>
                                    <button className={styles.itemBtn} onClick={()=>dispatch(deleteCard(el.id,el.title))} >
                                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                             xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M9.0799 7.61553L6.6311 5.16673L9.07982 2.71801C10.0241 1.77376 8.55964 0.309342 7.6154 1.25359L5.16668 3.70231L2.71787 1.2535C1.77384 0.309466 0.309467 1.77384 1.2535 2.71787L3.70231 5.16668L1.25359 7.61539C0.309343 8.55964 1.77376 10.0241 2.71801 9.07982L5.16673 6.6311L7.61553 9.0799C8.55969 10.0241 10.0241 8.55969 9.0799 7.61553Z"
                                                fill="#B5B5B5"/>
                                        </svg>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className={styles.cartFooterItem}>
                            <p className={styles.cartFooterTitle}>?????????????? </p>
                            <div className={styles.cartFooterLine}/>
                            <p className={styles.itemPrice}>{cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0)} ??. </p>
                        </div>

                        <div className={styles.cartFooterItem}>
                            <p className={styles.cartFooterTitle}>???????????? </p>
                            <div className={styles.cartFooterLine}/>
                            <p className={styles.itemPrice}>{points? `${points} ??.` : 0} </p>
                        </div>
                        <div className={styles.cartFooterItem}>
                            <p className={styles.cartFooterTitle}>?????????? </p>
                            <div className={styles.cartFooterLine}/>
                            <p className={styles.itemPrice}> {cart.reduce((acc,rec)=>acc+(rec.price*rec.count),0)-points} ??.</p>
                        </div>
                        <div className={styles.cartFooterItem}>
                            <p className={styles.cartFooterTitle}>??????????</p>
                            <div className={styles.cartFooterLine}/>
                            <p className={styles.itemPrice}>{Math.ceil((cart.reduce((acc, rec) => acc + rec.price*rec.count, 0)-points) / 100 * 3)} </p>
                        </div>


                    </div>
                </div>
                <div className={popup?styles.overlay : styles.overlayNon}>
                    <div className={styles.popup}>
                        <span className={styles.tick}><TiTick /></span> <p className={styles.popupText}>?????????????? ???? ??????????!</p>
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Orders;