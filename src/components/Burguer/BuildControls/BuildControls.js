import React from 'react';
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
];


const buildControls = (props) => (
    //Para Aredondar: tem isso mas tem o que foi usado tbm
    //{Math.round((props.price + Number.EPSILON) * 100) / 100}

    <div className={classes.BuildControls}>
        <p>Current Price:{props.price.toFixed(2)}<strong></strong></p>
        {controls.map(ctrl => (
            <BuildControl
                key={ctrl.label}
                label={ctrl.label}
                //pega o type de controls e roda a funcao ingredientAdded de burguerbuilding
                //Aqui: apenas ingredientAdded é imput e added output para build control
                //BurguerBuilder: ingredientAdded >>> BuildControls: added >>>BuildControl 
                added={() => props.ingredientAdded(ctrl.type)}
                removed={() => props.ingredientRemoved(ctrl.type)}
                disabled={props.disabled[ctrl.type]}
            />
        ))}
        <button
            className={classes.OrderButton}
            onClick={props.ordered}
            disabled={!props.purchasable}>ORDER NOW!
        </button>
    </div>
);



export default buildControls



