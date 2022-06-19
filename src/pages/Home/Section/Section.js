import React, {useEffect, useState} from 'react';
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
import {BsArrowUp} from 'react-icons/bs'
import {BsArrowDown} from 'react-icons/bs'


const Section = ({title,path}) => {
    const dispatch = useDispatch();

    const location = useLocation();
    const [sort,setSort] = useState('');



    const arr = useSelector((store) => store[path][path] );
    useEffect(() => {
        setSort('');
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

    function compare( a, b ) {
        if ( a.price < b.price ){
            return -1;
        }
        if ( a.price > b.price ){
            return 1;
        }
        return 0;
    }

    function compareLess( a, b ) {
        if ( b.price < a.price ){
            return -1;
        }
        if ( b.price > a.price ){
            return 1;
        }
        return 0;
    }



    return (
        <section className={styles.section}>
            <div className="container">
<div className={styles.block}>
    <Link style={{display:location.pathname.includes('/menu')? 'block' :'none'}} className={styles.back} to={'/'}>
        <IoIosArrowBack/>
    </Link>
    <div className={styles.rowBlock}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.sortBlock} style={{display:location.pathname.includes('/menu')? 'block' :'none'}}>Сортировать по : <span onClick={()=> setSort('higher')} className={`${styles.sort} ${sort==='higher'? styles.active:''}`} >Цене <BsArrowDown/></span>     <span onClick={()=>setSort('less')} className={`${styles.sort} ${sort==='less' ? styles.active : ''}`}>Цене<BsArrowUp/></span> </p>
    </div>
</div>
                <div className={styles.row}>
                    {sort === 'less' ? arr.sort(compare).map((item) => (
                        <Card key={item.id} item={location.pathname.length ? {...item, image: `../${item.image}`} : item}/>
                    ))
                    :sort==='higher'?
                            arr.sort(compareLess).map((item) => (
                                <Card key={item.id} item={location.pathname.length ? {...item, image: `../${item.image}`} : item}/>
                            ))
                        :
                        arr.map((item) => (
                        <Card key={item.id} item={location.pathname.length ? {...item, image: `../${item.image}`} : item}/>
                        ))
                    }
                </div>
            </div>


        </section>
    );
};

export default Section;