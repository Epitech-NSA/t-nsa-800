import {NextFunction, Request, Response} from "express";
import {winstonLogger} from "../logger";
export const loggerMiddelware = (req: Request, res: Response, next: NextFunction) => {

    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const start = Date.now();

    winstonLogger.info(`[${new Date().toISOString()}] Started ${req.method} ${req.path} for ${ip}`)
    winstonLogger.info(`[${new Date().toISOString()}] Started with token`, req.headers['auth'])

    res.on('finish', () => {
        const duration = Date.now() - start;
        if (res.statusCode >= 400) {
            winstonLogger.error("Error with body ", req.body)
        }
        winstonLogger.info(`[${new Date().toISOString()}] Completed ${res.statusCode} in (${duration}ms)`);
    });
    next();
};