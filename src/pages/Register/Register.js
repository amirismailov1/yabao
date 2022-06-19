import React,{useRef} from 'react';
import {registerAccount} from "../../redux/reducers/user/user";
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import styles from './register.module.css'
import {AiOutlineLeft} from "react-icons/ai";


const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const {
        register,
        formState : {
            errors
        },
        reset,
        watch,
        handleSubmit
    } = useForm();

    const registerUser = (data) => {
        dispatch(registerAccount({
            ...data,
            order: [],
 bonus:0
        }, navigate))

    };
    const password = useRef({});
     password.current = watch("password", "");

    return (
        <div className={styles.register}>
            <form className={styles.form} onSubmit={handleSubmit(registerUser)}>
                <div className={styles.block}>
                    <Link className={styles.back} to={'/'}><AiOutlineLeft/></Link>
                    <h3 className={styles.title}>Регистрация</h3>

                </div>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="login">Имя *</label>
                    <input {...register('login',{
                        required : "Это поле обязательно для заполнения",
                        minLength : {
                            value: 2,
                            message:'Минимум 2 символа'
                        }
                    })} className={styles.formInput}  type="text"/>
                </div>
                <span className={styles.error}>
                        {errors?.login && errors?.login?.message}
                    </span>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor={'email'}>Email *</label>
                    <input {...register('email',{
                        required : "Это поле обязательно для заполнения",
                        minLength : {
                            value: 2,
                            message:'Минимум 2 символа'
                        }

                    })} className={styles.formInput} type='email'/>
                </div>
                <span className={styles.error}>
                        {errors.email && errors?.email?.message}
                    </span>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor={'password'}>Пароль *</label>
                    <input {...register('password',{
                        required : "Это поле обязательно для заполнения",
                        minLength : {
                            value: 6,
                            message:'Минимальное количество символов в пароле: 6. Пожалуйста, введите другой пароль.'
                        }

                    })} className={styles.formInput} type='password'/>
                </div>
                <span className={styles.error}>
                        {errors?.password && errors?.password?.message}
                    </span>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor={'repass'}>Подтвердите пароль *</label>
                    <input {...register('repass',{
                        required : "Это поле обязательно для заполнения",
                        validate: value =>
                            value === password.current || 'Пароли должны совпадать'

                    })} className={styles.formInput} type='password'/>
                </div>
                <span className={styles.error}>
                        {errors?.repass && errors?.repass?.message}
                    </span>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="tel">Телефон *</label>
                    <input {...register('tel',{
                        required:'Это поле обязательно для заполнения',


                    })} className={styles.formInput} type="tel" />
                </div>
                <span className={styles.error}>
                        {errors?.tel && errors?.tel?.message}
                    </span>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="street">Адрес</label>
                    <input {...register('street',{

                        minLength : {
                            value: 2,
                            message:'Минимум 2 символа'
                        }
                    })} className={styles.formInput} type="text" />
                </div>
                <button className={styles.btn} type='submit'>Зарегистрироваться</button>
                <p className={styles.link}>
                    Уже есть аккаунт ?
                    <Link to='/login'>
                        Войти
                    </Link>
                </p>




            </form>

        </div>
    );
};

export default Register;