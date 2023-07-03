import axios from "axios";
import { Service } from "typedi";

@Service()
export class TaxesService{
    async TaxRate(city:any,address:any,zip:any):Promise<any>{
        let respuesta = await axios({
            method: 'get',
            url: "https://services.maps.cdtfa.ca.gov/api/taxrate/GetRateByAddress?address="+address+"&city="+city+"&zip="+zip})

        let response = await respuesta.data;
        return response;   
    }
}