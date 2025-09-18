import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromLocalStorage, cart } from "../../data/cart.js";

describe('test suite: renderOrderSummary', () => {
	const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
	const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

	beforeEach(() => {
		spyOn(localStorage, 'setItem');

		document.querySelector('.js-test-container').innerHTML = `
			<div class="js-order-summary"></div>
			<div class="js-payment-summary"></div>
		`;

		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: productId1,
				quantity: 2,
				deliveryOptionId: '1'
			}, {
				productId: productId2,
				quantity: 1,
				deliveryOptionId: '2'
			}]);
		});
		loadFromLocalStorage();
		renderOrderSummary();

		const productNameText = document.querySelector('.js-product-name').textContent;
		if (productNameText) {
			console.log(productNameText);
		}

		const productPriceText = document.querySelector('.js-product-price').textContent.trim();
		if (productPriceText) {
			// console.log(!productPriceText.includes('$'));
			if (!productPriceText.includes('$')) {
				console.log('seems suspicious!');
				let correctedProductPrice = ('$' + productPriceText);
				console.log(correctedProductPrice);
			}
			else {
				console.log('Turns out it works!');
			}
		}
		/*
		document.addEventListener("DOMContentLoaded", () => {
			let productNameText = document.querySelector('.js-product-name').textContent; // in work
			console.log(productNameText);
		});
		*/

		/*
		document.addEventListener("DOMContentLoaded", () => {
			// Check with a loop...
			const intervalSetter = setInterval(() => {
				let productPriceText = document.querySelector('.js-product-price').textContent;
				if (productPriceText) {
					console.log(productPriceText.textContent.includes('$'));
					clearInterval(intervalSetter);
				}
			}, 100);

		});
		*/
	});


	it('displays the cart', () => {

		expect(
			document.querySelectorAll('.js-cart-item-container').length
		).toEqual(2);
		expect(
			document.querySelector(`.js-product-quantity-${productId1}`).innerText
		).toContain('Quantity: 2');
		expect(
			document.querySelector(`.js-product-quantity-${productId2}`).innerText
		).toContain('Quantity: 1');
	});

	it('removes a product',() => {

		document.querySelector(`.js-delete-link-${productId1}`).click();
		expect(
			document.querySelectorAll('.js-cart-item-container').length
		).toEqual(1);
		expect(
		document.querySelector(`.js-cart-item-container-${productId1}`)
		).toEqual(null);
		expect(
		document.querySelector(`.js-cart-item-container-${productId2}`)
		).not.toEqual(null);
		expect(cart.length).toEqual(1);
		expect(cart[0].productId).toEqual(productId2);
	});

	// in work
	/*
	afterEach(() => {
		document.querySelector('.js-test-container').innerHTML = '';
	});
	*/
});

// https://www.youtube.com/watch?v=EerdGm-ehJQ&t=63360s 16i