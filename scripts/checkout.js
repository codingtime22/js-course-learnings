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
              <span class="update-quantity-link link-primary">Update</span>
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
}

renderCheckout();
updateCartQuantity();
