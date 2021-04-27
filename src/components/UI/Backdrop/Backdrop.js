import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.module.scss';

const BackDrop = ({ onClick }) => (
    <div tabIndex={0} aria-label={'Close menu'} role={'button'} className={classes.Backdrop} onClick={onClick} onKeyDown={onClick} />
);

BackDrop.propTypes = {
    onClick: PropTypes.func
};

BackDrop.defaultProps = {
    onClick: null
};

export default BackDrop;
