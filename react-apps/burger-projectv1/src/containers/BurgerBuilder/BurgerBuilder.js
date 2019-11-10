import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuldControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 0,
        purchasabled: false,
        purchasing: false,
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => ingredients[igKey])
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({ purchasabled: sum > 0 });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    addIngredient = (type) => () => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        const totalPrice = this.state.totalPrice;

        updatedIngredients[type] = newCount;

        const priceAddition = totalPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: priceAddition });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredient = (type) => () => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }

        const newCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        const totalPrice = this.state.totalPrice;

        updatedIngredients[type] = newCount;

        const priceDeduction = totalPrice - INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: priceDeduction });
        this.updatePurchaseState(updatedIngredients);
    }

    isDisabled = () => {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return disabledInfo;
    }

    render () {

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    totalPrice={this.state.totalPrice}
                    purchasabled={this.state.purchasabled}
                    ordered={this.purchaseHandler}
                    disabled={this.isDisabled()}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;