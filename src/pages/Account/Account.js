import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import {changeAccount, logOut} from "../../redux/reducers/user/user";
import styles from './acoount.module.css'
import {addCard, openCart} from "../../redux/reducers/cart/cart";
import {Link, useNavigate} from "react-router-dom";
import {IoIosArrowBack} from 'react-icons/io'


const Account = () => {
    const user = useSelector(store=>store.user.user);
    const [tabs,setTabs] = useState('settings');
    const [more,setMore] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [change,setChange] = useState(false);
    const changeUser = (data) => {
        dispatch(changeAccount(data,user ));
        setChange(false)
    };
    const repeatCart = (products) =>{
        products.map(element=>{
            if (element.count > 1){
                for ( let i =0 ; i <element.count; i++){
                    dispatch(addCard(element))
                }
            }
            else dispatch(addCard(element))

        })
        navigate('/');
        dispatch(openCart())
    };


    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm();
    return (
        <section>
            <div className="container">
                <div className={styles.row}>
                    <div className={styles.rowLeft}>
                        <Link  className={styles.back} to={'/'}>
                            <IoIosArrowBack/>
                        </Link>
                        <h2 className={styles.title}> Личный кабинет</h2>
                    </div>
                    <h3 className={styles.bonus}>Баллов : {user.bonus}</h3>
                    <div className={styles.rowRight}>


                        <button className={styles.changeBtn} style={{background:tabs==="settings"? '#FF2E65' : 'white',color:tabs==="settings"? 'white' : 'black'}} onClick={()=>setTabs('settings')} type='button'>Настройка аккаунта</button>
                        <button className={styles.changeBtn} style={{background:tabs==="history"? '#FF2E65' : 'white',color:tabs==="history"? 'white' : 'black'}} onClick={()=>setTabs('history')} type='button'>История заказов</button>

                    </div>
                </div>
                {
                    tabs==='settings'?
                        <form className={styles.block} onSubmit={handleSubmit(changeUser)}>
                            <div className={styles.blockHeader}>
                                <h4 className={styles.blockTitle}>Личные данные</h4>
                                <p className={styles.blockChange} onClick={()=>setChange(!change)}>{change? 'Отменить':'Изменить'}</p>

                            </div>

                            <div className={styles.blockContent}>

                                <label className={styles.blockCol}>
                                     <span className={styles.blockColTitle}>Имя</span>
                                    {change? <input className={styles.blockInput} {...register('login',{
                                        required: 'Эта строка не может быть пустой',
                                        minLength : {
                                            value: 2,
                                            message:'Минимум 2 символа'
                                        }
                                    })} type="text" defaultValue={user.login}/> : <p>{user.login}</p>}
                                </label>
                                <span className={styles.error}>
                      <span className={styles.error}>
                        {errors?.login && errors?.login?.message}
                    </span>
                    </span>
                                <label className={styles.blockCol}>
                                     <span className={styles.blockColTitle}>Номер телефона</span>
                                    {change? <input className={styles.blockInput} {...register('tel',{
                                        required: 'Эта строка не может быть пустой'
                                    })} type='tel' defaultValue={user.tel}/> :    <p>{user.tel}</p>}
                                </label>
                                <span className={styles.error}>
                        {errors?.tel && errors?.tel?.message}
                    </span>
                                <label className={styles.blockCol}>
                                     <span className={styles.blockColTitle}>Почта</span>
                                    {change? <input className={styles.blockInput} {...register('email',{
                                            required: 'Эта строка не может быть пустой',
                                            minLength : {
                                                value: 2,
                                                message:'Минимум 2 символа'
                                            }})} type='email' defaultValue={user.email}/> :   <p>{user.email}</p>}
                                </label>
                                <span className={styles.error}>
                        {errors?.email && errors?.email?.message}
                    </span>
                                <label className={styles.blockCol}>
                                     <span className={styles.blockColTitle}>Адрес</span>
                                    {change? <input className={styles.blockInput} {...register('street')} type='text' defaultValue={user.street}/> :   <p>{user.street}</p>}
                                </label>


                            </div>
                            {change? <button className={styles.blockBtn} type='submit'>Сохранить</button> : ''}
                            <button className={styles.logout} type='button' onClick={()=>{
                                dispatch(logOut());
                                navigate('/')
                            }}>Выйти</button>
                        </form>
                        :
                        <div>
                            <ul className={styles.list}>
                                {user.order.map(item=>(
                                    <li className={styles.item} key={item.id}>
                                        <div className={styles.top}>
                                            <div style={{background: '#'+Math.floor(Math.random()*16777215).toString(16)}} className={styles.border}>

                                            </div>
                                            <div className={styles.itemBlock}>
                                                <p className={styles.itemBlockTitle}>Заказ</p>
                                                <div className={styles.itemIdDate}>
                                                    <p className={styles.itemBlockInfo}>№{item.id.slice(0,5)}</p>
                                                    <span className={styles.itemDate}>{item.date}</span>
                                                </div>
                                            </div>
                                            <div className={styles.itemBlock}>
                                                <p className={styles.itemBlockTitle}>Сумма заказа</p>
                                                <p className={styles.itemBlockInfo}>{item.prePrice} ₽</p>
                                            </div>
                                            <div className={styles.itemBlock}>
                                                <p className={styles.itemBlockTitle}>Оплачено</p>
                                                <p className={styles.itemBlockInfo}>{item.pay}</p>
                                            </div>
                                            {more.includes(item.id)?<span onClick={()=>setMore(more.filter(el=>el !== item.id))}><svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 8.64986C16 8.45805 15.9289 8.26605 15.7869 8.11962L8.5142 0.619697C8.23002 0.326638 7.76984 0.326638 7.48584 0.619697L0.213135 8.11962C-0.0710456 8.41268 -0.0710456 8.88724 0.213135 9.18011C0.497316 9.47298 0.957497 9.47317 1.2415 9.18011L8.00002 2.21043L14.7585 9.18011C15.0427 9.47317 15.5029 9.47317 15.7869 9.18011C15.9289 9.03367 16 8.84167 16 8.64986Z" fill="#FF7010"/>
                                    </svg></span>:<span onClick={()=>setMore([...more,item.id])}><svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M16 1.35014C16 1.54195 15.9289 1.73395 15.7869 1.88038L8.5142 9.3803C8.23002 9.67336 7.76984 9.67336 7.48584 9.3803L0.213135 1.88038C-0.0710456 1.58732 -0.0710456 1.11276 0.213135 0.819893C0.497316 0.52702 0.957497 0.526833 1.2415 0.819893L8.00002 7.78957L14.7585 0.819892C15.0427 0.526833 15.5029 0.526833 15.7869 0.819892C15.9289 0.966328 16 1.15833 16 1.35014Z" fill="#FF7010"/>
                                    </svg></span>}





                                        </div>
                                        <div  className={styles.bottom}>
                                            <p>{item.street}</p>
                                            <div>
                                                {item.products.map(el=>(
                                                    <img className={styles.itemImg} src={el.image} alt=""/>
                                                ))}
                                            </div>
                                        </div>
                                        {more.includes(item.id)?
                                            <>
                                            <ul className={styles.moreList}>
                                                {item.products.map(elem => (
                                                    <li className={styles.moreItem}>
                                                        <img className={styles.moreItemImg} src={elem.image}  alt=""/>
                                                        <p className={styles.moreItemTitle}>{elem.title}</p>
                                                        <p className={styles.moreItemCount}>{elem.count} {elem.count === 1 ? 'товар' : elem.count > 1 < 5 ? 'товара' :'товаров'}</p>
                                                        <p className={styles.moreItemPrice}>{elem.price*elem.count} ₽</p>

                                                    </li>
                                                ))
                                                }

                                            </ul>
                                                <p onClick={()=>repeatCart(item.products)} className={styles.repeat}>Повторить заказ</p>
                                            </>


                                            :''
                                        }

                                    </li>
                                ))}

                            </ul>

                        </div>
                }

            </div>

        </section>
    );
};

export default Account;