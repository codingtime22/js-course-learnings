import {cart, removeFromCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {updateCartQuantity} from './utils/cartUtils.js';

function renderCheckout() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const matchingProduct = products.find(p => p.id === cartItem.productId);
    if (!matchingProduct) return;

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${cartItem.productId}">
        <div class="delivery-date">Delivery date: Wednesday, June 15</div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${cartItem.productId}">Update</span>
              <input class="quantity-input" data-product-id="${cartItem.productId}"></input>
              <span class="save-quantity-link link-primary" data-product-id="${cartItem.productId}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${cartItem.productId}">Delete</span>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  const orderSummaryEl = document.querySelector('.js-order-summary');
  if (!orderSummaryEl) {
    console.error('Missing .js-order-summary container in checkout.html');
    return;
  }

  orderSummaryEl.innerHTML = cartSummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`)?.remove();
      updateCartQuantity();
    });
  });

  document.querySelectorAll('.js-update-link').forEach((link2) => {
    link2.addEventListener('click', () => {
      const productId2 = link2.dataset.productId;
      const individualContainer = document.querySelector(`.js-cart-item-container-${productId2}`);
      individualContainer.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.save-quantity-link').forEach((link3) => {
    link3.addEventListener('click', () => {
      const productId2 = link3.dataset.productId;
      
      const inputFieldParent = document.querySelector(`.js-cart-item-container-${productId2}`);
      const inputFieldChild = inputFieldParent.querySelector('.quantity-input');
      
      const inputValueNumber = Number(inputFieldChild.value); 
      
      const cartItem = cart.find(item => item.productId === productId2)

      if (cartItem) {
        cartItem.quantity = inputValueNumber;
        updateCartQuantity();

        inputFieldParent.querySelector('.quantity-label').innerText = cartItem.quantity;
      }

      inputFieldParent.classList.remove('is-editing-quantity');
    });
  });
}

renderCheckout();
updateCartQuantity();