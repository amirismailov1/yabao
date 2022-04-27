import React,{useRef} from 'react';
import {registerAccount} from "../../redux/reducers/user/user";
import {useNavigate,Link} from 'react-router-dom'
import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import styles from './register.module.css'




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
        }, navigate))

    };
    const password = useRef({});
     password.current = watch("password", "");

    return (
        <div className={styles.register}>
            <form className={styles.form} onSubmit={handleSubmit(registerUser)}>
                 <h2 className={styles.title}>Регистрация</h2>
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

                    })} type='email'/>
                </div>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor={'password'}>Пароль *</label>
                    <input {...register('password',{
                        required : "Это поле обязательно для заполнения",
                        minLength : {
                            value: 6,
                            message:'Минимум 6 символов'
                        }

                    })} type='password'/>
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

                    })} type='password'/>
                </div>
                <span className={styles.error}>
                        {errors?.repass && errors?.repass?.message}
                    </span>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="tel">Телефон *</label>
                    <input {...register('tel',{
                        required:'Поле обязательное к заполнению',
                        pattern: {
                            // value: /^\\s*(?:\\+?(\\d{1,3}))?[-. (]*(\\d{3})[-. )]*(\\d{3})[-. ]*(\\d{4})(?: *x(\\d+))?\\s*$/,
                            message: "Invalid phone no",
                        }

                    })} className={styles.formInput} type="tel" />
                </div>
                <span className={styles.error}>
                        {errors?.tel && errors?.tel?.message}
                    </span>
                <div className={styles.formItem}>
                    <label className={styles.formLabel} htmlFor="street">Улица *</label>
                    <input {...register('street',{
                        required : "Это поле обязательно для заполнения",
                        minLength : {
                            value: 2,
                            message:'Минимум 2 символа'
                        }
                    })} className={styles.formInput} type="text" />
                </div>
                <span className={styles.error}>{errors?.street && errors?.street?.message}</span>
                 <div className={styles.checkbox}>
                     <label htmlFor="checkk">С условиями регистрации согласен *</label>
                     <input className={styles.check}  {...register('checkk',{
                         required:'Чтобы продолжить, нужно принять условия регистрации'
                     })}   type="checkbox"/>
                 </div>
                <span className={styles.error}>{errors?.checkk && errors?.checkk?.message}</span>
                <button type="submit">Зарегистрироваться</button>
                <p className={styles.link}>
                    Уже есть аккаунт ?   <Link to='/login'>
                    Войти
                </Link>
                </p>


            </form>

        </div>
    );
};

export default Register;