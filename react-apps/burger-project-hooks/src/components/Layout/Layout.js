import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
    const [ showSideDrawer, setShowSideDrawer ] = useState(false);

    const sideDrawerClosedHandler = () => {   
        setShowSideDrawer(false);
    }

    const sideDrawerOpenedHandler = () => {   
        setShowSideDrawer(!showSideDrawer);
    }

    return (
        <Aux>
            <SideDrawer
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
                isAuthenticated={props.isAuthenticated}
            />
            <Toolbar
                isAuthenticated={props.isAuthenticated}
                toggle={sideDrawerOpenedHandler}
            />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>    
    );
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== ''
    };
};

export default connect(mapStateToProps)(Layout);
