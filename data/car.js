class Car{
    brand;
    model;
    speed=0;
    isTrunkOpen=false;

    constructor(carDetails){
        this.brand= carDetails.brand;
        this.model=carDetails.model;
    }
    displayInfos(){
        console.log(`Marque de la voiture ${this.brand} Modele ${this.model} sa vitesse est de ${this.speed} km/h et son coffre est ${this.isTrunkOpen ? "ouvert" : "fermé" }
            ` );
    }
    go(){
        if(this.isTrunkOpen){
            console.log("Le coffre est ouvert, veuillez d'abord le fermer avant de bouger");
            return
        } 
        if(this.speed+5 >=200){
            console.log("Vitesse maximale atteinte");
            this.speed=200;
        }else{
        this.speed+=5;
        }
    }
    brake(){
        
        if(this.speed-5 <0){
            console.log("La voiture est déjà à l'arrêt");
            this.speed=0;
        }else{
            this.speed-=5;
        }
    }

    openTrunk(){
        if(this.speed>0){  
         this.isTrunkOpen=false;
            console.log("La voiture est en mouvement, impossible d'ouvrir le coffre");
        }
         
        else{
           this.isTrunkOpen=true;
            console.log("Le coffre est ouvert");
        }
    }
    closeTrunk(){
        this.isTrunkOpen=false;
        console.log("Vous venez de fermer le coffre")
    }

};
class RaceCar extends Car{

    acceleration;

    constructor(carDetails){

        super(carDetails)
        this.acceleration=carDetails.acceleration;
}
go(){
    if(this.speed+this.acceleration >=300){
            console.log("Vitesse maximale atteinte");
            this.speed=300;
        }else{
        this.speed+=this.acceleration;
        }
}

openTrunk(){
    console.log("Les voitures de course n'ont pas de coffre");
}
closeTrunk(){
    console.log("Les voitures de course n'ont pas de coffre");
}
displayInfos(){
        console.log(`Marque de la voiture ${this.brand} Modele ${this.model} sa vitesse est de ${this.speed} km/h` );
    }

}

const car1 = new Car({ brand: "Toyota", model: "Corolla" });
const car2 = new Car({brand: "Tesla", model : "Model 3"});
const raceCar1 = new RaceCar({ brand: "McLaren", model: "P1", acceleration: 20 });
raceCar1.displayInfos();
// car1.displayInfos();
car1.openTrunk();
car1.displayInfos();

car1.go();
car1.displayInfos();

car1.closeTrunk();
car1.go();
car1.displayInfos();
car1.openTrunk();
// car1.go();
// car1.displayInfos();
// car1.go();
// car1.go();
// car1.displayInfos();
// car1.go();
// car1.displayInfos();