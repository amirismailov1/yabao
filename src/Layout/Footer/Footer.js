import React from 'react';
import GoogleMapReact from 'google-map-react';
import styles from './footer.module.css'
import img from './footerImg.png'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

const Footer = () => {
    const defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 30,
    };

    return (
        <footer className={styles.footer}>
            <div className="container">

                    <h4 className={styles.title}>Мы находимся здесь:</h4>
                    <iframe
                        src="https://yandex.ru/map-widget/v1/?um=constructor%3A9eb0c42d599ef7b4692a61b6ac1fbfe36985a9aed46d1f90872a0c92b8158157&amp;source=constructor"
                        width="100%" height="476" frameBorder="0"></iframe>
                <div className={styles.block}>
                    <p className={styles.rights}>YaBao Все права защищены © 2021</p>
                    <a  href='tel:+996555555555' className={styles.number}>
                        +996 (555) 55 55 55
                    </a>
                    <img src={img} alt=""/>

                </div>
                </div>

        </footer>
    );
};

export default Footer;