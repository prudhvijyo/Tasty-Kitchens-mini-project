import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  addCartItem: () => {},
  DeleteCartItem: () => {},
  removeAllCartItems: () => {},

  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
