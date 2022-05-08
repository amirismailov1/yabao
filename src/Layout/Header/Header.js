import React, {useState} from 'react';
import Logo from  "../../assets/Logo.png"
import styles from './header.module.css'
;
import {Link} from 'react-router-dom'
import Popup from "./Popup/Popup";


const Header = () => {
 const [isOpen,setIsOpen] = useState(false);
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
                        <button className={styles.btn} type="button" onClick={()=>setIsOpen(true)}>Заказать звонок</button>
                        <a href='tel:+996555555555' className={styles.number}>
                           +996 (555) 55 55 55
                        </a>
                    </div>


                </div>

            </div>
            <Popup isOpen={isOpen} setIsOpen={setIsOpen}/>
        </header>
    );
};

export default Header;