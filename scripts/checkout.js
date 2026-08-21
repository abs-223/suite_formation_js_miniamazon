import { renderOrderSummary } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {loadProducts, loadProductsFetch} from '../data/products.js'
import {loadCart} from '../data/cart.js'
// import '../data/car.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';


//async-await

async function loadPage(){
try{
    // throw 'fioun
    // '
    // throw  'bruh'
    await loadProductsFetch();

    const value = await new Promise ((resolve,reject)=>{
        // throw 'erro2'
        loadCart(()=>{
            //si on veut créer des erreurs avec du code asynchrone (pour le futur)
            // reject('erro4')
            //vu que de base notre resolve va dans le then pour les promises mais ici on en a pas 
            // donc pas on pourra juste la save dans une variable plus haut au niveau de la variable 
            resolve('value3');
        })
    });

}catch(error){
    console.log("Unexcepted error try it plz again")
}
    
    renderOrderSummary();
    renderPaymentSummary();

}
// la valeur de return sera save dans le then comme parametre comme pour le fetch

loadPage();



/*
//Promise.all nous permet d'éxécuter les promises qu'elle contient en même temps sans attendre qu'elles s'éxécutent une à une 
Promise.all([
    //vu que notre ProductsFetch retourne 
    loadProductsFetch(),
    new Promise ((resolve)=>{
        loadCart(()=>{
            resolve();
        })
    })
]) .then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})

*/


// new Promise((resolve)=>{
//     // console.log("Start promise")
//     loadProducts(()=>{
//         // console.log("Finished loading")
//         resolve();
//     });

// }).then(()=>{
//     // console.log('next step')
//     return new Promise ((resolve)=>{
//         loadCart(()=>{
//             resolve();
//         })
//     });

// }).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })


// loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary();
//         renderPaymentSummary();
//     })
// });