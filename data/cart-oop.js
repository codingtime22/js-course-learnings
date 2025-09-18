const cart = {
	cartItems: undefined,

	loadFromLocalStorage() {
		this.cartItems = JSON.parse(localStorage.getItem('cart-oop'));

		if (!this.cartItems) {
			this.cartItems = [{
				productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
				quantity: 2,
				deliveryOptionId: '1'
			}, {
				productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
				quantity: 1,
				deliveryOptionId: '2'
			}];
		}
	},

	saveToLocalStorage() {
			localStorage.setItem('cart-oop', JSON.stringify(this.cartItems));
	},

	addToCart(productId) {
		let matchingItem;

		this.cartItems.forEach((cartItem1) => {
			if (productId === cartItem1.productId) {
				matchingItem = cartItem1;
			}
		});

		if (matchingItem) {
			matchingItem.quantity += 1;
		} else {
			this.cartItems.push({
				productId: productId,
				quantity: 1,
				deliveryOptionId: '1'
			});
		}

		this.saveToLocalStorage();
	},
	
	removeFromCart(productId) {
		const existsInCart = this.cartItems.some(item => item.productId === productId);
		if (!existsInCart) return; 

		let newCart = this.cartItems.filter(item => item.productId !== productId);
		
		newCart.forEach(item => {
				this.cartItems = newCart;
		});

		this.saveToLocalStorage();
	},

	updateDeliveryOption(productId, deliveryOptionId) {
		let matchingItem;

		this.cartItems.forEach((cartItem1) => {
			if (productId === cartItem1.productId) {
				matchingItem = cartItem1;
			}
		});

		matchingItem.deliveryOptionId = deliveryOptionId;
		this.saveToLocalStorage();
	},

	updateQuantity(productId, newQuantity) {
		this.cartItems.forEach((cartItem3) => {
			if (cartItem3.productId == productId) {
				cartItem3.quantity = newQuantity;
				console.log(cartItem3.quantity);
				this.saveToLocalStorage();
			}
		});
	}

};

cart.loadFromLocalStorage();

console.log(cart);