import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuldControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions';

import axios from '../../axios-orders';

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false,
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                console.log('resp')
                this.setState({ingredients: response.data});
            })
            .catch(error => {
                console.log('error', error);
                this.setState({error: true});
            });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/checkout');
    }

    isDisabled = () => {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return disabledInfo;
    }

    render () {
        let orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.props.totalPrice.toFixed(2) || 0}
                />
        );
        let burgerContent = (
            <Aux>
                <Burger ingredients={this.props.ings} />
                <BuildControls
                    ingredientAdded={this.props.onIngredientAdded}
                    ingredientRemoved={this.props.onIngredientRemoved}
                    totalPrice={this.props.totalPrice}
                    purchasabled={this.props.totalPrice > 0}
                    ordered={this.purchaseHandler}
                    disabled={this.isDisabled()}
                />
            </Aux>
        );
        let burger = this.state.error ? <p>Ingredients can't be loaded!</p> : burgerContent;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        totalPrice: state.totalPrice
    };
}
 
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => () => dispatch({type: actionTypes.ADD_INGREDIENT, ingredientName}),
        onIngredientRemoved: (ingredientName) => () => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));