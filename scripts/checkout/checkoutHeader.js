import {updateCartQuantity} from "../utils/cartUtils.js";

export function renderCheckoutHeader () {
	let checkoutHeaderDom = document.querySelector('.checkout-quantity-span');
	let checkoutItemHTML = `
		<a class="return-to-home-link js-item-quantity"href="amazon.html">${updateCartQuantity()}</a>
	`;
	checkoutHeaderDom.innerHTML = checkoutItemHTML;
	return checkoutHeaderDom;
}