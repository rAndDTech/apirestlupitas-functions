import * as dotenv from 'dotenv';
import cors from "cors";
import express,{Express, Router} from "express";
import * as http from 'http';
import Container from "typedi";
import {useContainer,useExpressServer} from 'routing-controllers'
import 'module-alias/register';
import 'reflect-metadata';
import { ENV_CONFIG } from "./config";

class App
{
    
    expressApp:Express;
    server:http.Server
    baseDir:string
    constructor(){
        dotenv.config();
        this.baseDir = __dirname;
        console.log(this.baseDir);
        this.expressApp = express();
        
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
    private middleware():void{
            
        //this.app.use(morgan('dev'));
        this.expressApp.use(cors());
        this.expressApp.use(express.urlencoded({extended:true}));
        this.expressApp.use(express.json());
    }
    /**
    * App Variables
    */
    private init() : void
    {
        if (!process.env.PORT) {
            process.exit(1);
        }
        // connect to your database
    }
    /**
     * Routes
     */
    private routes():void
    {
        //Handling the DemepndecyInyection across the entire application
        useContainer(Container);

        //Loads all controllers from the directories ans provides the rounting facility
        useExpressServer(this.expressApp,{
            routePrefix:ENV_CONFIG.app.apiRoot,
            defaultErrorHandler:true,
            controllers:[this.baseDir+`/**/controller{.js,.ts}`]
        })
    }

     /**
     * Server Activation
     */
     private listen(port:number): void{
        console.log("listen");
        this.server.listen(port, () => {
            console.log(`Listening on port ${port}`);
        });
    }
}

new App();