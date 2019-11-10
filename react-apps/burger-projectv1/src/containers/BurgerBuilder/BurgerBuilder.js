import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuldControls';

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
    }

    addIngredient = (type) => () => {
        const newCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};
        const totalPrice = this.state.totalPrice;

        updatedIngredients[type] = newCount;

        const priceAddition = totalPrice + INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: priceAddition });
    }

    removeIngredient = (type) => () => {
        const newCount = this.state.ingredients[type] - 1;

        if (newCount > 0) {
            return;
        }
        const updatedIngredients = {...this.state.ingredients};
        const totalPrice = this.state.totalPrice;

        updatedIngredients[type] = newCount;

        const priceDeduction = totalPrice - INGREDIENT_PRICES[type];

        this.setState({ ingredients: updatedIngredients, totalPrice: priceDeduction });
    }

    isDisabled = () => {
        const disabledInfo = {
            ...this.state.ingredients
        };

        console.log('isDisabled');

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return disabledInfo;
    }

    render () {

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredient}
                    ingredientRemoved={this.removeIngredient}
                    disabled={this.isDisabled()}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;