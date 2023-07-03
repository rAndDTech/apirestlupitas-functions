import axios from "axios";
import { Service } from "typedi";

/**
* Welcome to FuelEconomyController.js Class
* @author Vicente Aguilera Pérez <vicengui1018@gmail.com>
* @class
* Contains all method to access information of fuel economy
*/
@Service()
export class OpenRecallService{
    //year=2019&make=toyota&model=camry
    //year=2020&make=ford&model=f150

    /**
     * SearchCar
     * @param year is the year when the manufacturing company create the vehicle. (e.g. 2019)
     * @param make is the name of trademark of vehicle. (e.g. toyota)
     * @param model is the name of model. (e.g.camry)
     * @returns the Id of the car on fueleconomy.gov
     */
    async OpenRecall(year:number,make:string,model:string):Promise<any>{
         //year=2019&make=toyota&model=camry
         //year=2020&make=ford&model=f150
        let respuesta = await axios({
            method: 'get',
            url: "https://api.nhtsa.gov/recalls/recallsByVehicle?make="+make+"&model="+model+"&modelYear="+year})//year=2019&make=toyota&model=camry

        let response1 = await respuesta.data;
        return response1==null || response1==undefined?undefined:response1;  
    }
    
}

/**
 * import * as xml2js from 'xml2js';
 * npm install xml2js
 * npm install @types/xml2js
 * @deprecated
 * xml2js.parseString(response1, (err, result) => {
            if(err) {
                throw err;
            }
            // `result` is a JavaScript object
            response1=result;
        });
 */