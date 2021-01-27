
import React from 'react';

import classes from './Input.css';

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default input;



















































// import React from 'react';
// import classes from './Input.css'


// const input = (props) => {

//     //Setting Type
//     //Aqui: maneira que fazer um componente que se comporta de mais de uma forma
//     //{...props}> GERAL: acredita na forma de passar as props
//     let inputElement = null;
//     const inputClasses = [classes.InputElement];

//     if (props.invalid && props.shouldValidade && props.touched === true) {
//         inputClasses.push(classes.Invalid);
//     }

//     switch (props.elementtype) {
//         case ('input'):
//             // O que passar quando carregar o compenente> {...props} pega
//             // <Input inputType="input" type="text" name="name" placeholder="Your Name" />
//             inputElement = <input
//                 className={inputClasses.join(' ')}
//                 {...props.elementConfig}
//                 value={props.value}
//                 onChange={props.changed} />
//             break;
//         case ('textarea'):
//             inputElement = <textarea
//                 className={inputClasses.join(' ')}
//                 {...props.elementConfig}
//                 value={props.value}
//                 onChange={props.changed} />
//             break;
//         case ('select'):
//             inputElement = (<select
//                 className={inputClasses.join(' ')}
//                 value={props.value}
//                 onChange={props.changed}>
//                 {props.elementConfig.options.map(e => (
//                     <option key={e.value} value={e.value}>
//                         {e.displayValue}
//                     </option>
//                 ))}
//             </select>);
//             break;
//         default:
//             inputElement = <input
//                 className={classes.InputElement}
//                 {...props.elementConfig}
//                 value={props.value}
//                 onChange={props.changed} />
//     }


//     return (
//         <div className={classes.InputElement}>
//             <label className={classes.Label}>{props.label}</label>
//             {inputElement}
//         </div>
//     );
// };


// export default input;