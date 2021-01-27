import React from 'react';
import classes from './BuildControl.css'

//AQUI: onClick={props.added} > adiciona elemento no estado de BuildCOntrol > Controls > BurguerBuilder
const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less} onClick={props.removed} disabled={props.disabled}>Less</button>
        <button className={classes.More} onClick={props.added}>More</button>
    </div>
);



export default buildControl;