import { JsonController,Get,Req,Res } from "routing-controllers";
import { Service } from "typedi";
import { OpenRecallService } from "./service";
import { Request, Response } from "express";
import { Utils } from "../helpers/utils";
/**
* Welcome to FuelEconomyController.js Class
* @author Vicente Aguilera Pérez <vicengui1018@gmail.com>
* @class
* Contains all method to access information of fuel economy
*/
@JsonController("/openrecall")
@Service()
export class OpenRecallController{
    /**
     * @constructor
     * @public 
     * Default constructor
     */
    constructor(public openRecallService:OpenRecallService){}

    /**
     * Get information of the car necessary to obtain the id of the car
     * @public 
     * @instance
     * @param request  contains information of request.
     * @param response  contains information of response.
     * @returns 
     * response 400 with JSON Object {"message": "Not found Data (400)"} if response has not found nothing.
     * response 200 with JSON Object with information of Car
     * response 500 with JSON Object { "message": "Internal Error " } if exists a issue into API
     */
    @Get("/openrecalls")
    public  async getOpenRecalls(@Req() request: Request, @Res() response: Response):Promise<any>{
        let {year,make,model} = request.query;
        let message = Utils.isValid([year, make, model], ["year", "make", "model"]);
        if(message==null)
        {
            let result = await this.openRecallService.OpenRecall(year as unknown as number,make as unknown as string,model as unknown as string);
            if(result!=undefined){
                return response.status(200).json({
                    "result": result
                });
            }
            else{
                return response.status(500).json({ "message": "Internal Error" })
            }
        }
        else
        {
            return response.status(400).json(message)
        }
    }

   

    
}