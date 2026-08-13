export let cart= JSON.parse(localStorage.getItem('cart'))

if(!cart){
    cart = [
    {
        productId : '83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
        quantity : 2,
        deliveryOptionsId : '1'
    },
    {
        productId :'15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity : 1,
        deliveryOptionsId : '2'

    }
];
}

function saveToMemory(){
    localStorage.setItem('cart', JSON.stringify(cart))   
}

//  fonction pour update la quantité de la carte avec le bouton update
    export function updateQuantity(productId,newQuantity){
    let matchingItem;

        cart.forEach((cartItem)=>{
            if(productId===cartItem.productId){
                matchingItem=cartItem;
            }
        });
        matchingItem.quantity=newQuantity;
        saveToMemory();
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML=newQuantity;
        updateCartQuantity();
            
    }
    function updateCartQuantity(){
    let totalQuantity=0;
        cart.forEach((cartItem)=>{
            totalQuantity+=cartItem.quantity;
        });
        // console.log(cart)

        document.querySelector('.js-checkout-item').innerHTML=totalQuantity;
    }


export function addToCart(productId){ 
    let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let matchingItem;

    cart.forEach((cartItem)=>{

            if(productId === cartItem.productId ){
                matchingItem=cartItem;
            }
        })
        if(matchingItem){
            matchingItem.quantity+=quantity;
        }
        else{
            cart.push(
            {
                //Au lieu de productId:productId et quantity:quantity
                productId,
                quantity,
                deliveryOptionsId : '1'
            }
        );
    }

    // Pour enregistrer dans la mémoire à chaque fois qu'on update
saveToMemory();

const addedTimeoutid ={};

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
}
export function removeFromCart(productId){
    const newCart =[];
    cart.forEach((cartItem)=>{
        if(cartItem.productId!== productId){
            newCart.push(cartItem);
        }
    });
    cart =newCart;

    // Pour enregistrer encore dans la mémoire 
    saveToMemory();
}

export function updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    cart.forEach((cartItem)=>{

            if(productId === cartItem.productId ){
                matchingItem=cartItem;
            }
        })

        matchingItem.deliveryOptionsId= deliveryOptionId;
        saveToMemory();
}