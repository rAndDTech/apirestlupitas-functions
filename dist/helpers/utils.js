"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Utils = void 0;
/**
* Welcome to Utils.js Class
* @author Vicente Aguilera Pérez <vicengui1018@gmail.com>
* @class
* A Utils class is a general purposed utility
* class using which we can reuse the existing
* block of code without creating instance of the
* class
*/
class Utils {
    /**
     * @constructor
     * Default constructor
     */
    constructor() { }
    /**
     * Verify if a query parameter is undefined or missing.
     * @public
     * @static
     * @param params  list with values of query parameters ´params´.
     * @param paramsNames  list of keys of value of query parameters ´paramsNames´.
     * @returns null if all parameters are not
     * undefined otherwise  a json with the parameter that is undefined
     */
    static isValid(params, paramsNames) {
        for (let i = 0; i < params.length; i++) {
            if (params[i] == undefined || params[i] == "") {
                return { "message": `The ${paramsNames[i]} field is required.` };
            }
        }
        return null;
    }
    /**
     * Add a character '0'to left if the {num} contains just a digit.
     * @public
     * @static
     * @param {number} num
     * @returns a string with two caracters
     * @example if num=5 then returns 05
     */
    static padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    /**
    * Capitalized each word from a phase
    * @public
    * @static
    * @param {string} text
    * @returns a string capitalized
    * @example hello world => Hello World
    */
    static titleCase(text) {
        let splitStr = text.toLowerCase().split(' ');
        for (let i = 0; i < splitStr.length; i++) {
            // You do not need to check if i is larger than splitStr length, as your for does that for you
            // Assign it back to the array
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        // Directly return the joined string
        return splitStr.join(' ');
    }
}
exports.Utils = Utils;
