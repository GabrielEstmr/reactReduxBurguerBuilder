import React from 'react';
import classes from './Button.css'

//style={{}} primeiro colchetes: entreda dinamica > segundo: objeto do javascript

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>{props.children}
    </button>
);

export default button;