import express from "express";
import Middleware from "./utils/middleware.mjs";


//
const app = express();
const middleware = new Middleware(app, process.env);
const PORT = process.env.PORT;
//await middleware.dbInit();
middleware.routesInit();
middleware.catchNotFoundError();
middleware.catchErrors();
app.listen(PORT, (err) => {
    if (err) {
        console.error("Can not start server: ", err);
        return;
    }
    console.log(`Listening on port ${PORT}`);
})