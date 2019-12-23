import React from "react";
import "./cart-icon.styles.scss";
import { connect } from "react-redux";
import { toggleCartDropDown } from "@redux/cart/cart.actions";

import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import { selectCartItemsCount } from "@redux/cart/cart.selectors";

const CartIcon = ({ toggleCartDropDown, itemCount }) => (
  <div className="cart-icon" onClick={toggleCartDropDown}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">{itemCount}</span>
  </div>
);

const mapDispatchToProps = dispatch => ({
  toggleCartDropDown: () => dispatch(toggleCartDropDown())
});

const mapStateToProps = state => ({
  itemCount: selectCartItemsCount(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
