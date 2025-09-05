import {cart, addToCart} from '../data/cart.js';
import {products} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import {updateCartQuantity} from './utils/cartUtils.js';

let productsHTML = '';

products.forEach((productsElement) => {
  productsHTML += `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${productsElement.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${productsElement.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${productsElement.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${productsElement.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${formatCurrency(productsElement.priceCents)}
      </div>

      <div class="product-quantity-container">
        <select class="js-quantity-selector">
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart"
      data-product-id="${productsElement.id}">
        Add to Cart
      </button>
    </div>
  `;
});

const elementExist = document.querySelector('.js-products-grid');
if (elementExist) {
  document.querySelector('.js-products-grid').innerHTML = productsHTML;
}

updateCartQuantity();

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantity = Number(button.closest('.product-container')
        .querySelector('select').value);

      for (let i = 0; i < quantity; i++) {
        addToCart(productId);
      }

      updateCartQuantity();
    });
  });
