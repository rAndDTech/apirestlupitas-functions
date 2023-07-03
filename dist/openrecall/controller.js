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
exports.OpenRecallController = void 0;
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
let OpenRecallController = exports.OpenRecallController = class OpenRecallController {
    /**
     * @constructor
     * @public
     * Default constructor
     */
    constructor(openRecallService) {
        this.openRecallService = openRecallService;
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
    getOpenRecalls(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            let { year, make, model } = request.query;
            let message = utils_1.Utils.isValid([year, make, model], ["year", "make", "model"]);
            if (message == null) {
                let result = yield this.openRecallService.OpenRecall(year, make, model);
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
};
__decorate([
    (0, routing_controllers_1.Get)("/openrecalls"),
    __param(0, (0, routing_controllers_1.Req)()),
    __param(1, (0, routing_controllers_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], OpenRecallController.prototype, "getOpenRecalls", null);
exports.OpenRecallController = OpenRecallController = __decorate([
    (0, routing_controllers_1.JsonController)("/openrecall"),
    (0, typedi_1.Service)(),
    __metadata("design:paramtypes", [service_1.OpenRecallService])
], OpenRecallController);
