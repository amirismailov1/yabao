import React, {useEffect} from 'react';
import styles from './section.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useLocation,Link} from "react-router-dom";
import Card from "./Card/Card";
import {getSushi} from "../../../redux/reducers/sushi/sushi";
import {getSoup} from "../../../redux/reducers/soup/soup";
import {getSet} from "../../../redux/reducers/set/set";
import {getDrinks} from "../../../redux/reducers/drinks/drinks";
import {getSnacks} from "../../../redux/reducers/snacks/snacks";
import {getSous} from "../../../redux/reducers/sous/sous";
import {IoIosArrowBack} from 'react-icons/io'

const Section = ({title,path}) => {
    const dispatch = useDispatch();

    const location = useLocation();



    const arr = useSelector((store) => store[path][path] );
    useEffect(() => {
        switch (path) {
            case 'sushi' : dispatch(getSushi());
                break;
            case 'soup' : dispatch(getSoup());
                break;
            case 'snacks' : dispatch(getSnacks());
                break;
            case 'set' : dispatch(getSet());
                break;
            case 'drinks' : dispatch(getDrinks());
                break;
            case 'sous' : dispatch(getSous());
                break;
            default : console.log('err')
        }

    },[]);


    return (
        <section className={styles.section}>
            <div className="container">
<div className={styles.block}>
    <Link style={{display:location.pathname.includes('/menu')? 'block' :'none'}} className={styles.back} to={'/'}>
        <IoIosArrowBack/>
    </Link>
    <h2>{title}</h2>
</div>
                <div className={styles.row}>
                    {arr.map((item) => (
                        <Card key={item.id} item={location.pathname.length ? {...item, image: `../${item.image}`} : item}/>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Section;