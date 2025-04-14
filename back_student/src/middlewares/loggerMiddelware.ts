import {NextFunction, Request, Response} from "express";
import {winstonLogger} from "../logger";
export const loggerMiddelware = (req: Request, res: Response, next: NextFunction) => {

    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        winstonLogger.info(`[${new Date().toISOString()}] ${req.method} ${req.path} => ${res.statusCode} (${duration}ms)`);

        if (res.statusCode >= 400) {
            winstonLogger.error("Request on Error : ", req)
        }
    });
    next();
};