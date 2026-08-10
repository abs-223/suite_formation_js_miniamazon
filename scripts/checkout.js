import { cart, removeFromCart,updateQuantity } from "../data/cart.js";
import { products } from "../data/products.js";

    let cartHtml='';
cart.forEach((cartItem)=>{

    const {productId} = cartItem;
    let matchingProduct;

    
    products.forEach((product)=>{
        if(productId===product.id){
        matchingProduct=product
    }
    });
    
    cartHtml+=  `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${(matchingProduct.priceCents/100).toFixed(2)}
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `;
    // console.log(matchingProduct)
    document.querySelector('.js-order-summary').innerHTML=cartHtml;

    document.querySelectorAll('.js-delete-link').forEach((link)=>{

      link.addEventListener('click',()=>{
        const {productId} = link.dataset;
        removeFromCart(productId);

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.remove();
        
        console.log(container);
        updateCartQuantity()
      })

    })
    updateCartQuantity();

    // Pour l'update
    document.querySelectorAll('.js-update-link').forEach((link)=>{
      link.addEventListener('click', ()=>{

        const {productId}= link.dataset;
        // console.log(productId);
        // Faire apparaître el buton save et l'input
        document.querySelector(`.js-cart-item-container-${productId}`).classList.add("is-editing-quantity")
        // Faire disparaitre le button update et qt
      
      })
    })

    //Pour le bouton save
    document.querySelectorAll('.save-quantity-link').forEach((link)=>{
      link.addEventListener('click',()=>{
        const {productId}= link.dataset;
        // console.log(productId);
        // Faire apparaître update à nouveau

             //recup la valeur de l'input
            const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
            console.log(quantityInput.value);
            let newQuantity=Number(quantityInput.value);

            if(newQuantity<=0 || newQuantity>=1000){alert('wesh gros? c\'est pas bon ça ');return}

        updateQuantity(productId,newQuantity);

        document.querySelector(`.js-cart-item-container-${productId}`).classList.remove("is-editing-quantity")

      })
    
    })


})
function updateCartQuantity(){
    let totalQuantity=0;
        cart.forEach((cartItem)=>{
            totalQuantity+=cartItem.quantity;
        });
        // console.log(cart)

        document.querySelector('.js-checkout-item').innerHTML=totalQuantity;
      }