import { JsonController,Get,Req,Res } from "routing-controllers";
import { Service } from "typedi";
import { TaxesService } from "./service";
import { Request, Response } from "express";
import { Utils } from "../helpers/utils";


@JsonController("/taxes")
@Service()
export class TaxesController{
    constructor(public taxesService:TaxesService){}

    @Get("/tax")
    public  async getTaxes(@Req() request: Request, @Res() response: Response):Promise<any>{
        let{city,address,zip}= request.query;
        
        let message = Utils.isValid([address,city,zip],["address","city","zipcode"]);
        if(message==null)
        {
            //create object
            let result = await this.taxesService.TaxRate(city,address,zip);
            if(result.errors)
            {
                return response.status(400).json({"message":"The address could not be geocoded." })
            }
            if(result.taxRateInfo.length==1){
                return response.status(200).json({"taxRateInfo":result.taxRateInfo});
            }
            else{
                city = (city as string).replace("+"," ").toUpperCase();
                let array =result.taxRateInfo.find((it: { city: string | undefined; })=>it.city==city);
                return response.status(200).json({
                    "taxRateInfo":[array]
                });
            } 
        }
        else
        {
            response.status(404).json(message)
        }
        
       
    }
}