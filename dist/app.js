"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http = __importStar(require("http"));
const typedi_1 = __importDefault(require("typedi"));
const routing_controllers_1 = require("routing-controllers");
require("module-alias/register");
require("reflect-metadata");
const config_1 = require("./config");
class App {
    constructor() {
        dotenv.config();
        this.baseDir = __dirname;
        console.log(this.baseDir);
        this.expressApp = (0, express_1.default)();
        this.server = http.createServer(this.expressApp);
        this.init();
        this.middleware();
        this.expressApp.set('json spaces', 2);
        this.expressApp.set('port', process.env.PORT || 3000);
        this.listen(this.expressApp.get('port'));
        this.routes();
    }
    /**
     *  App Configuration
     */
    middleware() {
        //this.app.use(morgan('dev'));
        this.expressApp.use((0, cors_1.default)());
        this.expressApp.use(express_1.default.urlencoded({ extended: true }));
        this.expressApp.use(express_1.default.json());
    }
    /**
    * App Variables
    */
    init() {
        if (!process.env.PORT) {
            process.exit(1);
        }
        // connect to your database
    }
    /**
     * Routes
     */
    routes() {
        //Handling the DemepndecyInyection across the entire application
        (0, routing_controllers_1.useContainer)(typedi_1.default);
        //Loads all controllers from the directories ans provides the rounting facility
        (0, routing_controllers_1.useExpressServer)(this.expressApp, {
            routePrefix: config_1.ENV_CONFIG.app.apiRoot,
            defaultErrorHandler: true,
            controllers: [this.baseDir + `/**/controller{.js,.ts}`]
        });
    }
    /**
    * Server Activation
    */
    listen(port) {
        console.log("listen");
        this.server.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
}
new App();
