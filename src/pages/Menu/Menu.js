import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import Section from "../Home/Section/Section";

const Menu = () => {

    const params = useParams()


    return (
        <section>
            <div className="container">

                <Section title={ params.category === 'sushi' ? 'Суши' : params.category === 'set' ? 'Сеты' :
                    params.category === 'snacks' ? 'Закуски' : params.category === 'drinks' ? 'Напитки' : params.category === 'sous' ? 'Добавки и соусы' : 'Супы'} path={params.category}/>

            </div>
        </section>
    );
};

export default Menu;