import {cart, removeFromCart,updateQuantity, updateDeliveryOption} from '../../data/cart.js';
import {products, getProduct} from '../../data/products.js';
import {formatCurrency} from '../utils/money.js';
import {updateCartQuantity} from '../utils/cartUtils.js';
// import {hello} from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js'
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // const matchingProduct = products.find(p => p.id === cartItem.productId);

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays, 'days'
    );
    const dateString = deliveryDate.format(
      'dddd, MMMM D'
    );

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${cartItem.productId}" data-product-id="${cartItem.productId}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>
        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}">
          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(matchingProduct.priceCents)}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary js-update-link" data-product-id="${cartItem.productId}">Update</span>
              <input class="quantity-input" data-product-id="${cartItem.productId}" type="number" min="1" max="1000">
              <span class="save-quantity-link link-primary" data-product-id="${cartItem.productId}">Save</span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${cartItem.productId}">Delete</span>
            </div>
          </div>
        </div>
        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct,
          cartItem)}
        </div>
      </div>
    </div>
    `;
  });

  function deliveryOptionsHTML(matchingProduct,
  cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays, 'days'
      );
      const dateString = deliveryDate.format(
        'dddd, MMMM D'
      );

      const priceString = deliveryOption.priceCents 
      === 0
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)} -`;

      const isChecked = deliveryOption.id ===
      cartItem.deliveryOptionId;

      html += `
      <div class="delivery-option js-delivery-option"
        data-product-id="${matchingProduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
    });

    return html;
  }

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
      updateCartQuantity();
      renderOrderSummary(); // instead of modifiying the DOM this regenerates it (MVC)
      renderPaymentSummary();
    });
  });


  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
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
      onEventAction(link3.dataset.productId);
    });
  });

  document.body.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      // Find the active input field
      const activeInput = document.querySelector('.quantity-input:focus');
      if (!activeInput) return;

      const productId = activeInput.closest('.cart-item-container').dataset.productId;
      onEventAction(productId);

    }
  });

}

function onEventAction(productId2) {
  const inputFieldParent = document.querySelector(`.js-cart-item-container-${productId2}`);
  const inputFieldChild = inputFieldParent.querySelector('.quantity-input');
  
  const inputValueNumber = Number(inputFieldChild.value);
  let inputValueNumber2;
  
  if (inputValueNumber % 1 == 0 && typeof inputValueNumber === 'number') {
    inputValueNumber2 = inputValueNumber;
  }
  else {
    inputValueNumber2 = 1;
  }

  const cartItem = cart.find(item => item.productId === productId2)

  if (cartItem) {
    cartItem.quantity = inputValueNumber2;
    updateQuantity(productId2, cartItem.quantity);

    inputFieldParent.querySelector('.quantity-label').innerText = cartItem.quantity;
  }

  inputFieldParent.classList.remove('is-editing-quantity');
  updateCartQuantity();
}

updateCartQuantity();