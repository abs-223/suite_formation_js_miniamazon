function Cart(localStorageKey){

const cart ={
    cartItem : undefined ,

loadFromStorage(){
    
this.cartItem = JSON.parse(localStorage.getItem(localStorageKey))

if(!this.cartItem){
    this.cartItem = [
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
},
    saveToMemory(){
    localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem))   
},


    addToCart(productId){ 
    // let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let matchingItem;

    this.cartItem.forEach((cartItem)=>{

            if(productId === cartItem.productId ){
                matchingItem=cartItem;
            }
        })
        if(matchingItem){
            matchingItem.quantity+=1;
        }
        else{
            this.cartItem.push(
            {
                //Au lieu de productId:productId et quantity:quantity
                productId,
                quantity:1,
                deliveryOptionsId : '1'
            }
        );
    }

    // Pour enregistrer dans la mémoire à chaque fois qu'on update
    this.saveToMemory();

    // Remove all of this code below so the rest can work

// const addedTimeoutid ={};

//     //added to cart
//     const addedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
//     addedToCart.classList.add('added-to-cart-visible');
    
//     const lastAddedMessage = addedTimeoutid[productId];//ensuite il vient ici
//     //puis on vérifie s'il est là
//     if(lastAddedMessage){
//         clearTimeout(lastAddedMessage);
//     console.log(addedTimeoutid[productId])

//     }
    
//     let timeoutId = setTimeout(()=>{
//         addedToCart.classList.remove('added-to-cart-visible');

//     },2000);
//     // etape1 : tu stockes lid ici 
//     addedTimeoutid[productId]=timeoutId;
},

removeFromCart(productId){
    const newCart =[];
    this.cartItem.forEach((cartItem)=>{
        if(cartItem.productId!== productId){
            newCart.push(cartItem);
        }
    });
    this.cartItem = newCart;

    // Pour enregistrer encore dans la mémoire 
    this.saveToMemory();
},

updateDeliveryOption(productId, deliveryOptionId){
    let matchingItem;

    this.cartItem.forEach((cartItem)=>{

            if(productId === cartItem.productId ){
                matchingItem=cartItem;
            }
        })

        matchingItem.deliveryOptionsId= deliveryOptionId;
        this.saveToMemory();
}
};

return cart;
}

const cart = Cart('cart-oop');
const businessCart=Cart('business-cart');

cart.loadFromStorage();
businessCart.loadFromStorage();

// cart.addToCart('dd82ca78-a18b-4e2a-9250-31e67412f98d');
console.log(cart);
console.log(businessCart);




//Apres voir pourquoi moi il me reste tout ça ? 
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





