"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRecallService = void 0;
const axios_1 = __importDefault(require("axios"));
const typedi_1 = require("typedi");
/**
* Welcome to FuelEconomyController.js Class
* @author Vicente Aguilera Pérez <vicengui1018@gmail.com>
* @class
* Contains all method to access information of fuel economy
*/
let OpenRecallService = exports.OpenRecallService = class OpenRecallService {
    //year=2019&make=toyota&model=camry
    //year=2020&make=ford&model=f150
    /**
     * SearchCar
     * @param year is the year when the manufacturing company create the vehicle. (e.g. 2019)
     * @param make is the name of trademark of vehicle. (e.g. toyota)
     * @param model is the name of model. (e.g.camry)
     * @returns the Id of the car on fueleconomy.gov
     */
    OpenRecall(year, make, model) {
        return __awaiter(this, void 0, void 0, function* () {
            //year=2019&make=toyota&model=camry
            //year=2020&make=ford&model=f150
            let respuesta = yield (0, axios_1.default)({
                method: 'get',
                url: "https://api.nhtsa.gov/recalls/recallsByVehicle?make=" + make + "&model=" + model + "&modelYear=" + year
            }); //year=2019&make=toyota&model=camry
            let response1 = yield respuesta.data;
            return response1 == null || response1 == undefined ? undefined : response1;
        });
    }
};
exports.OpenRecallService = OpenRecallService = __decorate([
    (0, typedi_1.Service)()
], OpenRecallService);
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
