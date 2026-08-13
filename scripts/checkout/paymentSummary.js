import {cart} from '../../data/cart.js';
import { getProduct } from '../../data/products.js';
import { getDeliveryOption } from '../../data/deliveryOptions.js';

export function renderPaymentSummary(){
    let productPriceCents=0;
    let shippingPriceCents = 0 ;
    // console.log('here is where im gonna put the payment summary code');
    cart.forEach(cartItem => {
            const product = getProduct(cartItem.productId);
            productPriceCents+=product.priceCents * cartItem.quantity;  

            const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId)
            // console.log(deliveryOption)

            shippingPriceCents += deliveryOption.priceCents;

        });

    // console.log(productPriceCents)
    // console.log(shippingPriceCents)
    const totalBeforeTaxe = productPriceCents + shippingPriceCents;
    const taxCent = totalBeforeTaxe*0.1;
    const totalCents = totalBeforeTaxe+ taxCent;

    const paymentSummaryHTML = `
         <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-items-total">Items </div>
            <div class="payment-summary-money">$${(productPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${(shippingPriceCents/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${(totalBeforeTaxe/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${(taxCent/100).toFixed(2)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${(totalCents/100).toFixed(2)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
        // document.querySelector('.js-items-total').innerHTML=totalQuantity;

    document.querySelector('.js-payment-summary').innerHTML= paymentSummaryHTML;


} 