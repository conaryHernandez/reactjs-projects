import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'},
];


const BuildControls = (props) => {

    const renderBuildControls = () => controls.map(ctrl => (
        <BuildControl
            key={ctrl.label}
            label={ctrl.label}
            added={props.ingredientAdded(ctrl.type)}  
            removed={props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}    
        />
    ));

    return (
        <div className={classes.BuildControls}>
            {renderBuildControls()}
        </div>
    );
};

export default BuildControls;