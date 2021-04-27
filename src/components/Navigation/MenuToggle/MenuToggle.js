import React from 'react';
import PropTypes from 'prop-types';
import classes from './MenuToggle.module.scss';

const MenuToggle = ({ isOpen, onToggle }) => {
    const cls = [classes.MenuToggle, 'fas'];

    if (isOpen) {
        cls.push('fa-times');
        cls.push(classes.open);
    } else {
        cls.push('fa-bars');
    }

    return <i tabIndex={0} aria-label={'Toggle menu'} role={'button'} className={cls.join(' ')} onClick={onToggle} onKeyDown={onToggle} />;
};

MenuToggle.propTypes = {
    isOpen: PropTypes.bool,
    onToggle: PropTypes.func
};

MenuToggle.defaultProps = {
    isOpen: false,
    onToggle: null
};

export default MenuToggle;
