import {cart} from '../data/cart.js';

let productsHtml = "";
products.forEach((product) => {
productsHtml += `
        <div class="product-container">
        <div class="product-image-container">
        <img
            class="product-image"
            src="${product.image}"
        />
        </div>

        <div class="product-name limit-text-to-2-lines">
        ${product.name}
        </div>

        <div class="product-rating-container">
        <img
            class="product-rating-stars"
            src="images/ratings/rating-${product.rating.stars}.png"
        />
        <div class="product-rating-count link-primary">${product.rating.count}</div>
        </div>

        <div class="product-price">$${(product.priceCents / 100).toFixed(2)}</div>

        <div class="product-quantity-container">
        <select class="js-quantity-selector-${product.id}">
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

        <div class="added-to-cart js-added-to-cart-${product.id}">
        <img src="images/icons/checkmark.png" />
        Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-card" data-product-id='${product.id}'>Add to Cart</button>
    </div>
`;
});
    // Ceci est un test pour voir si tout fonctionne correctement


document.querySelector(".js-products-grid").innerHTML = productsHtml;

const addedTimeoutid ={};


document.querySelectorAll('.js-add-to-card').forEach((button)=>{
    button.addEventListener('click',()=>{
        // au lieu de const productId=button.dataset.productId
        const {productId}=button.dataset;
        
        let matchingItem;

        let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        

        cart.forEach((item)=>{

            if(productId === item.productId ){
                matchingItem=item;
            }
        })
        if(matchingItem){
            matchingItem.quantity+=quantity;
        }
        else{cart.push(
            {
                //Au lieu de productId:productId et quantity:quantity
                productId,
                quantity
            }
        );
    }
    let totalQuantity=0;
        cart.forEach((item)=>{
            totalQuantity+=item.quantity;
        });
        console.log(cart)

        document.querySelector('.js-cart-quantity').innerHTML=totalQuantity;


    //added to cart
    const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    addedToCart.classList.add('added-to-cart-visible');
    
    const lastAddedMessage = addedTimeoutid[productId];//ensuite il vient ici
    //puis on vérifie s'il est là
    if(lastAddedMessage){
        clearTimeout(lastAddedMessage);
    console.log(addedTimeoutid[productId])

    }
    
    let timeoutId = setTimeout(()=>{
        addedToCart.classList.remove('added-to-cart-visible');

    },2000);
    // etape1 : tu stockes lid ici 
    addedTimeoutid[productId]=timeoutId;
})
})
