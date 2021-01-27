import React from 'react';
import classes from './Burguer.css';
import BurguerIngredient from './BurguerIngredient/BurguerIngredient';

const burguer = (props) => {
    //Object: faz o mesmo para todos os elemetos do objeto; Keys:Retorna os nomes de cada elemento do objeto
    //No caso: pegou Objeto.ingredients > que tbm é array const transformedIngredients = Object.keys(props.ingredients);
    // console.log(Object.keys(props.ingredients));
    // console.log((props.ingredients));   igKey + i = chave pois é o ingrediente mais indice

    //reduce: chama callbabk function se [] ou seja: elemento nulo
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurguerIngredient key={igKey + i} type={igKey}></BurguerIngredient>
            });
        }).reduce((arr, el) => {
            return arr.concat(el)
        }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Plase Start Adding Ingredients!</p>
    }

    return (
        <div className={classes.Burguer}>
            <BurguerIngredient type='bread-top'></BurguerIngredient>
            {transformedIngredients}
            <BurguerIngredient type='bread-bottom'></BurguerIngredient>
        </div>
    );
};

export default burguer;