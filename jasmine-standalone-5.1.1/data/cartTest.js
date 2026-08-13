import { addToCart,cart,loadFromStorage } from "../../data/cart.js";

describe ('test suite : add to cart', ()=>{

    it('ajouter un produit deja existant à la carte',()=>{
    
    });
    it('ajouter un nouveau produit à la carte',()=>{
         //Pour moque le return de localStorage et faire en sorte qu'il retourne un empty array
        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        console.log(localStorage.getItem('cart'));
        loadFromStorage();

        addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e')
        expect(cart.length).toEqual(1);
    })

})