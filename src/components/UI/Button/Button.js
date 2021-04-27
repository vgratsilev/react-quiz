import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

const Button = ({ type, onClick, disabled, children }) => {
    const cls = [classes.Button, classes[type]];

    return (
        <button type={'button'} onClick={onClick} className={cls.join(' ')} disabled={disabled}>
            {children}
        </button>
    );
};

Button.propTypes = {
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    children: PropTypes.string
};

Button.defaultProps = {
    type: '',
    onClick: null,
    disabled: false,
    children: ''
};

export default Button;
