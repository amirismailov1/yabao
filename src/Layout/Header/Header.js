import React from 'react';
import Logo from  "../../assets/Logo.png"
import styles from './header.module.css'
;
import {Link} from 'react-router-dom'

const Header = () => {

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.top}>
                    <div>
                        <Link className={styles.logo} to={'/'}>
                            <img  src={Logo} alt="YA BAO"/>
                            <div className={styles.logoText}>
                                <h1 className={styles.title}>YA BAO</h1>
                                <p className={styles.subtitle}>Дух китайской еды</p>
                            </div>
                        </Link>
                    </div>
                    <div className={styles.info}>
                        <h3 className={styles.infoTitle}>
                            Доставка еды <span className={styles.infoTitlePink}>Бишкек</span>
                        </h3>
                        <div className={styles.infoTime}>Время доставки
                            <p className={styles.infoCircle}>

                        </p>  от 31 мин</div>
                    </div>
                    <div className={styles.call}>
                        <button className={styles.btn}>Заказать звонок</button>
                        <p className={styles.number}>
                            8 800 333-36-62
                        </p>
                    </div>


                </div>

            </div>
        </header>
    );
};

export default Header;