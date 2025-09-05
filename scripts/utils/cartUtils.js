import {cart} from "../../data/cart.js";

export function updateCartQuantity() {
	let cartQuantity = 0;

	cart.forEach((cartItem) => {
		cartQuantity += cartItem.quantity;
	});

	const cartQuantityEl = document.querySelector('.js-cart-quantity');
	if (cartQuantityEl) cartQuantityEl.innerHTML = cartQuantity;

	const itemQuantityEl = document.querySelector('.js-item-quantity');
	if (itemQuantityEl) itemQuantityEl.innerHTML = cartQuantity;

	return cartQuantity;
}
