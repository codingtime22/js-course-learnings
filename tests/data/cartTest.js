import { addToCart, cart, loadFromLocalStorage } from "../../data/cart.js";

describe('test suite: addToCart', () => {
	beforeEach(() => {
		spyOn(localStorage, 'setItem');
	});

	it('adds an existing product to the cart', () => {
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 1,
				deliveryOptionId: '1'
			}]);
		});
		loadFromLocalStorage();

		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(2);

		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
	});

	it('adds a new product to the cart', () => {
		spyOn(localStorage, 'getItem').and.callFake(() => {
			return JSON.stringify([]);
		});
		loadFromLocalStorage();
		
		addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart.length).toEqual(1);
		expect(localStorage.setItem).toHaveBeenCalledTimes(1);
		expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
		expect(cart[0].quantity).toEqual(1);
		
		expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(cart));
	});
});


describe('test suite: removeFromCart', () => {
	beforeEach(() => {
		spyOn(localStorage, 'setItem');
		spyOn(localStorage, 'getItem');
	});

	it('remove a productId that is in the cart', (done) => {
		const checkForLink = () => {
			const deleteLink = document.querySelector('.js-delete-link');
			if (deleteLink) {
				deleteLink.click();
				
				expect(removeFromCart).toHaveBeenCalledWith(productId);
      	done();
			} else {
				setTimeout(checkForLink, 10);
			}
		};
		checkForLink();
	});
});