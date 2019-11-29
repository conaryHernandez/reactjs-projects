import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliar';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuldControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

const BurgerBuilder = (props) => {
    const [ purchasing, setPurchasing ] = useState(false);

    useEffect(() => {
        props.onInitIngredients();
    }, [])

    const purchaseHandler = () => {
        if (props.isAuth) {
            setPurchasing(true);
        } else {
            props.onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        props.onPurchaseInit();
        props.history.push('/checkout');
    }

    const isDisabled = () => {
        const disabledInfo = {
            ...props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return disabledInfo;
    }

    let orderSummary = (
        <OrderSummary
            ingredients={props.ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            totalPrice={props.totalPrice.toFixed(2) || 0}
        />
    );
    let burgerContent = (
        <Aux>
            <Burger ingredients={props.ings} />
            <BuildControls
                ingredientAdded={props.onIngredientAdded}
                ingredientRemoved={props.onIngredientRemoved}
                totalPrice={props.totalPrice}
                purchasabled={props.totalPrice > 0}
                ordered={purchaseHandler}
                isAuth={props.isAuth}
                disabled={isDisabled()}
            />
        </Aux>
    );
    let burger = props.error ? <p>Ingredients can't be loaded!</p> : burgerContent;

    return (
        <Aux>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandler}
            >
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.token !== ''
    };
}
 
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingredientName) => () => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved: (ingredientName) => () => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients: () => dispatch(actions.initIngridients()),
        onPurchaseInit: () => dispatch(actions.purchaseInit()),
        onSetRedirectPath: (path) => dispatch(actions.setAuthRedirect(path))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));