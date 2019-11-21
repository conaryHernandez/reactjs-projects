import React from 'react';

import classes from './Toolbar.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../SideDrawer/ToggleButton/ToggleButton';

const Toolbar = (props) => {
    return (<header className={classes.Toolbar}>
        <ToggleButton clicked={props.toggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>);
};

export default Toolbar;