import React from 'react';
import classes from './Backdrop.module.scss';

const BackDrop = (props) => (
    <div
        className={classes.Backdrop}
        onClick={props.onClick}
    >
    </div>
)

export default BackDrop;
