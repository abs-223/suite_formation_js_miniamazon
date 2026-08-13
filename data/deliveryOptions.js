import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];

export function getDeliveryOption(deliveryOptionId) {
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

// function isWeekend (date){
//     const dayOfWeek = date.format('dddd');
//     return dayOfWeek==='Saturday' || dayOfWeek==='Sunday'
// }

export function calculateDeliveryDate(deliveryOption) {

    // let jourRestants = deliveryOption.deliveryDays;
    // let deliveryDate = dayjs();

    // while (jourRestants>0){
    //     deliveryDate = deliveryDate.add(1,'day');
    //     if(!isWeekend(deliveryDate)){
    //         jourRestants--;
    //     }
    // }

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
  const dateString = deliveryDate.format("dddd, MMMM D");
  return dateString;
}
