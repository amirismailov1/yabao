import React, {useState} from 'react';
import styles from './login.module.css'
import {useForm} from "react-hook-form";
import {GoEyeClosed} from "react-icons/go";
import {GoEye} from "react-icons/go";
import {Link, useNavigate} from "react-router-dom";
import {loginAccount} from "../../redux/reducers/user/user";
import {useDispatch} from "react-redux";
import {AiOutlineLeft} from 'react-icons/ai'

const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const loginUser = (data) => {

        dispatch(loginAccount(data,navigate ))

    };
    const {
        register,
        handleSubmit
    } = useForm();
    const [pass,setPass] = useState(false);
    return (
        <div className={styles.login}>
            <form className={styles.form} onSubmit={handleSubmit(loginUser)}>
                <div className={styles.block}>
                    <Link className={styles.back} to={'/'}><AiOutlineLeft/></Link>
                    <h3 className={styles.title}>Вход в аккаунт</h3>

                </div>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="email">Email</label>
                    <input {...register('email')} className={styles.formInput} type="email"/>
                </div>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="password">Пароль</label>
                    <input {...register('password')} className={styles.formInput} type={pass?'text':'password'}/>
                    <span className={styles.eye} onClick={()=>setPass(!pass)}>{pass?<GoEyeClosed/>:<GoEye/> }</span>
                </div>

                <p className={styles.agreement}>Продолжая, вы соглашаетесь со сбором <br/>   и обработкой персональных данных <br/> и пользовательским соглашением</p>

                <button type="submit" className={styles.btn}>Войти</button>



                <p className={styles.link}>
                    Ещё нет аккаунта ?
                      <Link to='/register'>
                          Зарегистрироваться
                      </Link>
                </p>
                
            </form>

        </div>
    );
};

export default Login;