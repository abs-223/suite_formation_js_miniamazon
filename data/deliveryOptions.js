export const deliveryOptions =[{
    id : '1',
    deliveryDays : 7,
    priceCents : 0
},{
    id : '2',
     deliveryDays : 3,
    priceCents : 499
},{
    
    id : '3',
     deliveryDays : 1,
    priceCents : 999
}];

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
          
          deliveryOptions.forEach((option) => {
            if (option.id === deliveryOptionId) {
              deliveryOption = option;
            }
            //JE jure qu'il ya deux secondes ça ne fonctionnait pas je sais pourquoi là comme par magie ça good alors qu'il n'y avait rien de bizarre
    
            // console.log(option.id, deliveryOptionId)
            // console.log(typeof(option.id))
            // console.log(typeof(deliveryOptionId))
          });
          return deliveryOption || deliveryOptions[0];
}