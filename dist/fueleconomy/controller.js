"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelEconomyController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const service_1 = require("./service");
const utils_1 = require("../helpers/utils");
/**
* Welcome to FuelEconomyController.js Class
* @author Vicente Aguilera Pérez <vicengui1018@gmail.com>
* @class
* Contains all method to access information of fuel economy
*/
let FuelEconomyController = exports.FuelEconomyController = class FuelEconomyController {
    /**
     * @constructor
     * @public
     * Default constructor
     */
    constructor(fuelEconomyService) {
        this.fuelEconomyService = fuelEconomyService;
    }
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
    getCars(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { year, make, model } = request.query;
            let message = utils_1.Utils.isValid([year, make, model], ["year", "make", "model"]);
            if (message == null) {
                let result = yield this.fuelEconomyService.SearchCar(year, make, model);
                if (result != undefined) {
                    if (result.menuItems == "") {
                        return response.status(400).json({
                            "count": 0,
                            "result": "",
                            "message": "Not found Data (400)"
                        });
                    }
                    else {
                        let count = result.menuItem.length;
                        if (count > 1) {
                            return response.status(200).json({
                                "count": count,
                                "result": result.menuItem
                            });
                        }
                        else {
                            let id = result.menuItem.value;
                            return response.status(200).json({
                                "count": count,
                                "result": id
                            });
                        }
                    }
                }
                else {
                    return response.status(400).json({
                        "count": 0,
                        "result": "",
                        "message": "Not found Data (400)"
                    });
                }
            }
            else {
                response.status(404).json(message);
            }
        });
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
    getId(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let id = request.query.id;
            let message = utils_1.Utils.isValid([id], ["id"]);
            if (message == null) {
                let result = yield this.fuelEconomyService.SearchId(id);
                if (result != undefined) {
                    return response.status(200).json({
                        "result": result
                    });
                }
                else {
                    return response.status(500).json({ "message": "Internal Error" });
                }
            }
            else {
                return response.status(400).json(message);
            }
        });
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
    getFuelEconomyModels(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { year, make, model } = request.query;
            let message = utils_1.Utils.isValid([year, make, model], ["year", "make", "model"]);
            if (message == null) {
                let result = yield this.fuelEconomyService.SearchModels(year, make);
                if (result != undefined) {
                    let models = result.menuItem;
                    let modelsValues = [];
                    for (let i = 0; i < result.menuItem.length; i++) {
                        modelsValues.push(models[i].value);
                    }
                    model = model;
                    model = model.toLowerCase();
                    model = model.replace("-", "");
                    modelsValues = modelsValues.filter(word => word.toLowerCase().includes(model));
                    if (modelsValues.length == 0) {
                        return response.status(200).json({
                            count: modelsValues.length,
                            "message": `In ${year}, ${make} does not manufacture vehicles with that model`
                        });
                    }
                    else {
                        return response.status(200).json({
                            count: modelsValues.length,
                            "result": modelsValues,
                        });
                    }
                }
                else {
                    return response.status(500).json({ "message": "Internal Error" });
                }
            }
            else {
                return response.status(400).json(message);
            }
        });
    }
};
__decorate([
    (0, routing_controllers_1.Get)("/searchcars"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FuelEconomyController.prototype, "getCars", null);
__decorate([
    (0, routing_controllers_1.Get)("/searchcarids"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FuelEconomyController.prototype, "getId", null);
__decorate([
    (0, routing_controllers_1.Get)("/fuelmodels"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FuelEconomyController.prototype, "getFuelEconomyModels", null);
exports.FuelEconomyController = FuelEconomyController = __decorate([
    (0, routing_controllers_1.JsonController)("/fueleconomy"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [service_1.FuelEconomyService])
], FuelEconomyController);
