export let cart = JSON.parse(localStorage.getItem('cart'));


if (!cart) {
	cart = [{
	productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
	quantity: 2,
	deliveryOptionId: '1'
	}, {
	productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
	quantity: 1,
	deliveryOptionId: '2'
	}];
}

function safeToLocalStorage() {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
	let matchingItem;

	cart.forEach((cartItem1) => {
		if (productId === cartItem1.productId) {
			matchingItem = cartItem1;
		}
	});

	if (matchingItem) {
		matchingItem.quantity += 1;
	} else {
		cart.push({
			productId: productId,
			quantity: 1,
			deliveryOptionId: '1'
		});
	}

	safeToLocalStorage();
}

export function removeFromCart(productId) {
	const newCart = [];

	cart.forEach((cartItem1) => {
		if (cartItem1.productId !== productId) {
			newCart.push(cartItem1);
		}
	});

	cart = newCart;

	safeToLocalStorage();
}

export function updateQuantity(productId, newQuantity) {
	cart.forEach((cartItem3) => {
		if (cartItem3.productId == productId) {
			cartItem3.quantity = newQuantity;
			console.log(cartItem3.quantity);
			safeToLocalStorage();
		}
	});
}