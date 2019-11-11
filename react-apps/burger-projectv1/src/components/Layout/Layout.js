import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/ToolBar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class layout extends Component {
    state = {
        showSideDrawer: false,
    }

    sideDrawerClosedHandler = () => {   
        this.setState({ showSideDrawer: false});
    }

    sideDrawerOpenedHandler = () => {   
        this.setState((prevState) => {
            return {
                showSideDrawer: !prevState.showSideDrawer
            };
        });
    }

    render() {
        return (
            <Aux>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <Toolbar toggle={this.sideDrawerOpenedHandler} />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>    
        );
    }
}

export default layout;