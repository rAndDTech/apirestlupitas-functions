import { JsonController,Get,Req,Res } from "routing-controllers";
import { Service } from "typedi";
import { FuelEconomyService } from "./service";
import { Request, Response } from "express";
import { Utils } from "../helpers/utils";
/**
* Welcome to FuelEconomyController.js Class
* @author Vicente Aguilera Pérez <vicengui1018@gmail.com>
* @class
* Contains all method to access information of fuel economy
*/
@JsonController("/fueleconomy")
@Service()
export class FuelEconomyController{
    /**
     * @constructor
     * @public 
     * Default constructor
     */
    constructor(public fuelEconomyService:FuelEconomyService){}

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
    @Get("/searchcars")
    public  async getCars(@Req() request: Request, @Res() response: Response):Promise<any>{

        let {year,make,model} = request.query;
        let message = Utils.isValid([year, make, model], ["year", "make", "model"]);
        if(message==null)
        {
            let result = await this.fuelEconomyService.SearchCar(year as unknown as number,make as unknown as string,model as unknown as string);
            if(result!=undefined){
                if (result.menuItems == "") {
                    return response.status(400).json(
                        { 
                            "count":0,
                            "result":"",
                            "message": "Not found Data (400)" 
                        })
                }
                else {
                    let count= result.menuItem.length
                    if(count>1)
                    {
                        return response.status(200).json({
                            "count": count,
                            "result": result.menuItem
                        });
                    }
                    else{
                        
                        let id = result.menuItem.value
                        return response.status(200).json({
                            "count": count,
                            "result": id
                        });
                    }
                }
            }
            else{
                return response.status(400).json(
                    { 
                        "count":0,
                        "result":"",
                        "message": "Not found Data (400)" 
                    })
            }
        }
        else
        {
            response.status(404).json(message)
        }
    }

    /**
     * Get the Fuel econmomy in city and highway of the car
     * @public 
     * @instance
     * @param request  contains information of request.
     * @param response  contains information of response.
     * @returns 
     * response 400 with JSON Object `The X field is required.` if response has not found a required query parameter
     * response 200 with JSON Object with information of Fuel Econmomy in city and highway
     * response 500 with JSON Object { "message": "Internal Error " } if exists a issue into API
     */
    @Get("/searchcarids")
    public  async getId(@Req() request: Request, @Res() response: Response):Promise<any>{

        let id = request.query.id;
        let message = Utils.isValid([id], ["id"]);
        if(message==null)
        {
            let result = await this.fuelEconomyService.SearchId(id as unknown as number);
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
            return response.status(400).json(message);
        }
    }
     /**
     * Get the Fuel econmomy in city and highway of the car
     * @public 
     * @instance
     * @param request  contains information of request.
     * @param response  contains information of response.
     * @returns 
     * response 400 with JSON Object `The X field is required.` if response has not found a required query parameter
     * response 200 with JSON Object with information of Fuel Econmomy in city and highway
     * response 500 with JSON Object { "message": "Internal Error " } if exists a issue into API
     */
    @Get("/fuelmodels")
    public  async getFuelEconomyModels(@Req() request: Request, @Res() response: Response):Promise<any>{

        let {year,make,model} = request.query;
   
        let message = Utils.isValid([year,make,model], ["year","make","model"]);
        if(message==null)
        {
            let result = await this.fuelEconomyService.SearchModels(year as unknown as number,make as unknown as string);
            if(result!=undefined)
            {
                let models=result.menuItem;
                let modelsValues = [];
                for(let i=0;i<result.menuItem.length; i++)
                {
                    modelsValues.push(models[i].value)
                }
                model = model as unknown as string;
                model=model.toLowerCase();
                model=model.replace("-","");
                modelsValues = modelsValues.filter(word => word.toLowerCase().includes(model));
                if(modelsValues.length==0)
                {
                    return response.status(200).json({
                        count : modelsValues.length,
                        "message":`In ${year}, ${make} does not manufacture vehicles with that model`
                    });
                }
                else{
                    return response.status(200).json({
                        count : modelsValues.length,
                        "result": modelsValues,
                        
                    });
                }
            }
            else{
                return response.status(500).json({ "message": "Internal Error" })
               
            }
           
        }
        else
        {
            return response.status(400).json(message);
        }
        
       
    }
    
}