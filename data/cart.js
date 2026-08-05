export const cart=[];

export function addToCart(productId){ 
    let matchingItem;

        let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        

        cart.forEach((cartItem)=>{

            if(productId === cartItem.productId ){
                matchingItem=cartItem;
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