
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const currentModuleURL = import.meta.url;
const currentModulePath = fileURLToPath(currentModuleURL);
const projectDirectory = dirname(currentModulePath);

const slash = process.platform === "win32" ? "\\" : "/";

export default {
    NODE_ENV: process.env.NODE_ENV || "",
    API_VERSION: process.env.API_VERSION || "",
    PORT: 4000,
    APP_KEY: process.env.APP_KEY || "",
    DB_HOST: process.env.DB_HOST || "",
    DB_NAME: process.env.DB_NAME || "",
    DB_USERNAME: process.env.DB_USERNAME || "",
    DB_PASSWORD: process.env.DB_PASSWORD || "",
    DB_PORT: process.env.DB_PORT
}


