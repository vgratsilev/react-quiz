import React from 'react';
import PropTypes from 'prop-types';
import classes from './Select.module.scss';

const Select = ({ label, value, options, onChange }) => {
    const htmlFor = `${label}-${Math.random()}`;

    return (
        <div className={classes.Select}>
            <label htmlFor={htmlFor}>{label}</label>
            <select id={htmlFor} value={value} onChange={onChange}>
                {options.map((option, index) => {
                    return (
                        // eslint-disable-next-line react/no-array-index-key
                        <option value={option.value} key={option.value + index}>
                            {option.text}
                        </option>
                    );
                })}
            </select>
        </div>
    );
};

Select.propTypes = {
    label: PropTypes.string,
    value: PropTypes.number,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.number,
            value: PropTypes.number
        })
    ),
    onChange: PropTypes.func
};

Select.defaultProps = {
    label: '',
    value: null,
    options: [],
    onChange: null
};

export default Select;
