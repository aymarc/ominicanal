import { json, raw, urlencoded } from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import { Sequelize } from "sequelize";
import redis from "redis";
//
import constants from "./constants.mjs";
//import PackageController from "../modules/package/index.js";
import config from "../config.mjs";



const { CODE404, CODE500, GENERIC_ERROR_MESSAGE, ROUTE_PREFIX } = constants;
//const packageController = new PackageController();
//const redisClient = redis.createClient({ url: 'redis://0.0.0.0:6379' });
// redisClient.on('error', (err) => {
//     console.log('Error occured while connecting or accessing redis server');
// });
// await redisClient.connect();
// console.log("redisClient ", redisClient.isOpen)

class Middleware {

    constructor(app, env) {
        this.app = app;
        this.env = env;
        if (this.env.NODE_ENV === "prod") {
            this.app.use(helmet());
            this.app.use(compression());
        }
        this.app.use(raw());
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.app.use(cors());

    }



    async dbInit() {
        try{
            const dbName = "ominicanal" //config.DB_NAME;
            const dbUser = "postgres"; // config.DB_USERNAME;
            const dbHost = "localhost"; //config.DB_HOST;
            const dbPassword = "admin"; //DB_PASSWORD
            const dbPort = 5432;
            
            const db = new Sequelize(
                dbName,
                dbUser,
                dbPassword,
                {
                  host: dbHost,
                  port: dbPort,
                  dialect: 'postgres'
                }
              );
           
            await db.sync();
        }catch(err){
            console.error("postgres Error", err)
        }
       
    }

    routesInit() {
        //this.app.use(ROUTE_PREFIX, packageController.init());
    }

    catchErrors() {
        this.app.use((err, req, res, next) => {
            if (!err) {
                return next();
            }
            console.error(`======Error Start====== \n ${err} \n ======Error End======`);
            const message = err.httpStatusCode ? {
                success: false,
                info: err.message
            } : {
                success: false,
                info: GENERIC_ERROR_MESSAGE
            }
            res.status(err.httpStatusCode || CODE500).json(message);
        })
    }

    catchNotFoundError() {
        try {
            this.app.use((req, res, next) => {
                res.status(CODE404).json({
                    message: `The route '${req.get("HOST")}${req.originalUrl}' was not found.`
                })
            })
        } catch (err) {
            throw new Error(`Error occurred while handling not found route '${req.originalUrl}': ${err}`);
        }
    }
}

export default Middleware;

