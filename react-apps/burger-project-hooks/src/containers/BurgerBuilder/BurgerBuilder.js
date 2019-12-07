import React, { useState, useEffect, useCallback } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';

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
    const dispatch = useDispatch();

    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuth = useSelector(state => state.auth.token !== '');

    const onIngredientAdded =  (ingredientName) => () => dispatch(actions.addIngredient(ingredientName));
    const onIngredientRemoved =  (ingredientName) => () => dispatch(actions.removeIngredient(ingredientName));
    const onInitIngredients =  useCallback(
        () => dispatch(actions.initIngridients()),
        [dispatch],
    )
    const onPurchaseInit =  () => dispatch(actions.purchaseInit());
    const onSetRedirectPath =  (path) => dispatch(actions.setAuthRedirect(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients])

    const purchaseHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            onSetRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onPurchaseInit();
        props.history.push('/checkout');
    }

    const isDisabled = () => {
        const disabledInfo = {
            ...ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        };

        return disabledInfo;
    }

    let orderSummary = (
        <OrderSummary
            ingredients={ings}
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            totalPrice={totalPrice.toFixed(2) || 0}
        />
    );
    let burgerContent = (
        <Aux>
            <Burger ingredients={ings} />
            <BuildControls
                ingredientAdded={onIngredientAdded}
                ingredientRemoved={onIngredientRemoved}
                totalPrice={totalPrice}
                purchasabled={totalPrice > 0}
                ordered={purchaseHandler}
                isAuth={isAuth}
                disabled={isDisabled()}
            />
        </Aux>
    );
    let burger = error ? <p>Ingredients can't be loaded!</p> : burgerContent;

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