import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.scss';

function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched;
}

const Input = (props) => {
    const { type, label, value, errorMessage, onChange } = props;
    const inputType = type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label htmlFor={htmlFor}>{label}</label>
            <input id={htmlFor} type={inputType} value={value} onChange={onChange} />

            {isInvalid(props) && <span>{errorMessage || 'Please input correct value'}</span>}
        </div>
    );
};

Input.propTypes = {
    type: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    errorMessage: PropTypes.string,
    onChange: PropTypes.func
};

Input.defaultProps = {
    type: '',
    label: '',
    value: '',
    errorMessage: '',
    onChange: null
};

export default Input;
