import {
  cart,
  removeFromCart,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products,getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import { deliveryOptions,getDeliveryOption } from "../../data/deliveryOptions.js";

const date = dayjs();
date.add(8, "days");
console.log(date.format("dddd, MMMM,D"));

  export function renderOrderSummary() {
    let cartHtml = "";
    cart.forEach((cartItem) => {
      const { productId } = cartItem;

      const matchingProduct=getProduct(productId);

      

      const deliveryOptionId = cartItem.deliveryOptionsId;


      const deliveryOption= getDeliveryOption(deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM D");

      cartHtml += `
          <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">
                Delivery date: ${dateString}
              </div>

              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${matchingProduct.image}">

                <div class="cart-item-details">
                  <div class="product-name">
                    ${matchingProduct.name}
                  </div>
                  <div class="product-price">
                    $${(matchingProduct.priceCents / 100).toFixed(2)}
                  </div>
                  <div class="product-quantity">
                    <span>
                      Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary js-update-link" data-product-id='${matchingProduct.id}'>
                      Update
                    </span>


                    <!-- ajout de cette classe pour rendre le bouton update interactif-->
                    <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                    <span class="save-quantity-link link-primary" data-product-id='${matchingProduct.id}'>Save</span>


                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id='${matchingProduct.id}'>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
              </div>
            </div>
      `;
    });
    function deliveryOptionsHTML(matchingProduct, cartItem) {
      let html = "";

      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
        const dateString = deliveryDate.format("dddd, MMMM, D");
        const priceString =
          deliveryOption.priceCents === 0
            ? "FREE"
            : `$${(deliveryOption.priceCents / 100).toFixed(2)} - `;

        const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

        html += `
            <div class="delivery-option js-delivery-option"
            data-product-id="${matchingProduct.id}"
            data-delivery-option-id="${deliveryOption.id}">
                    <input type="radio" 
                      ${isChecked ? "checked" : ""}
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
          `;
      });
      return html;
    }
    // console.log(matchingProduct)
    document.querySelector(".js-order-summary").innerHTML = cartHtml;

    document.querySelectorAll(".js-delete-link").forEach((link) => {
      link.addEventListener("click", () => {
        const { productId } = link.dataset;
        removeFromCart(productId);

        const container = document.querySelector(
          `.js-cart-item-container-${productId}`,
        );
        container.remove();

        console.log(container);
        updateCartQuantity();
      });
    });
    updateCartQuantity();

    // Pour l'update
    document.querySelectorAll(".js-update-link").forEach((link) => {
      link.addEventListener("click", () => {
        const { productId } = link.dataset;
        // console.log(productId);
        // Faire apparaître el buton save et l'input
        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.add("is-editing-quantity");
        // Faire disparaitre le button update et qt
      });
    });

    //Pour le bouton save
    document.querySelectorAll(".save-quantity-link").forEach((link) => {
      link.addEventListener("click", () => {
        const { productId } = link.dataset;
        // console.log(productId);
        // Faire apparaître update à nouveau

        //recup la valeur de l'input
        const quantityInput = document.querySelector(
          `.js-quantity-input-${productId}`,
        );
        console.log(quantityInput.value);
        let newQuantity = Number(quantityInput.value);

        if (newQuantity <= 0 || newQuantity >= 1000) {
          alert("wesh gros? c'est pas bon ça ");
          return;
        }

        updateQuantity(productId, newQuantity);

        document
          .querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove("is-editing-quantity");
      });
    });

    function updateCartQuantity() {
      let totalQuantity = 0;
      cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
      });
      // console.log(cart)

      document.querySelector(".js-checkout-item").innerHTML = totalQuantity;
    }

    document.querySelectorAll(".js-delivery-option").forEach((element) => {
      element.addEventListener("click", () => {
        const { productId, deliveryOptionId } = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
      });
    });
}
