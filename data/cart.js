export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
	cart = [{
	productsId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
	quantity: 2,
}, {
	productsId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
	quantity: 1
}];
}

function safeToLocalStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productsId) {
	let matchingItem;

	cart.forEach((cartItem) => {
		if (productsId === cartItem.productsId) {
			matchingItem = cartItem;
		}
	});

	if (matchingItem) {
		matchingItem.quantity += 1;
	} else {
		cart.push({
			productsId: productsId,
			quantity: 1
		});
	}

	safeToLocalStorage();
}

export function removeFromCart(productId) {
	const newCart = [];

	cart.forEach((cartItem) => {
		if (cartItem.productsId !== productId) {
			newCart.push(cartItem);
		}
	});

	cart = newCart;

	safeToLocalStorage();
}