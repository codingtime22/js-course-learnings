
import {updateCartQuantity} from "../utils/cartUtils.js";

export function renderCheckoutHeader () {
	/*
	let checkoutHeaderDom = document.querySelector('.checkout-quantity-span');
	console.log(document.querySelector('.checkout-quantity-span'));
	*/
	
	let checkoutItemHTML = `
		<a class="return-to-home-link js-item-quantity" href="amazon.html">${updateCartQuantity()}</a>
	`;

	/*
	console.log(checkoutHeaderDom);
	if (checkoutHeaderDom) {
		checkoutHeaderDom.innerHTML = checkoutItemHTML;
	} else {
		console.log('Element .checkout-quantity-span not found');
	}
	return checkoutHeaderDom;
	*/
}

// wird warscheinlich überhaupt nicht gebraucht