import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuldControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
};

class BurgerBuilder extends Component {

    state = {
        ingredients: {},
        totalPrice: 0,
        purchasabled: false,
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

    purchaseContinueHandler = () => {

        const queryParams = [];

        for(let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));

        }

        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });

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
        let orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    totalPrice={this.state.totalPrice.toFixed(2) || 0}
                />
        );
        let burgerContent = (
            <Aux>
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

export default withErrorHandler(BurgerBuilder, axios);