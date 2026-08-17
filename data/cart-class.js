class Cart{

    cartItem ;
    // Pour la mettre en privée on doit mettre un # ici et aussi dans l'objet
    #localStorageKey;

    constructor(localStorageKey){
        this.#localStorageKey= localStorageKey,
        this.#loadFromStorage();
    }


#loadFromStorage(){
    
    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey))

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
};

 saveToMemory(){
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem))   
};

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
};

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
};

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

}




const cart = new Cart('cart-oop');
const businessCart=new Cart('cart-business');

// Pour voir si notre variable est vraiment une instance de notre objet 
// console.log(cart instanceof Cart)


// cart.addToCart('dd82ca78-a18b-4e2a-9250-31e67412f98d');


//Just to show u that u cannot use private properties outside the class
// cart.#localStorageKey='bonjour';
console.log(cart);
console.log(businessCart); 