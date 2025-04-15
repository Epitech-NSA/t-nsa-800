import winston from "winston"
import {Logtail} from "@logtail/node";
import {LogtailTransport} from "@logtail/winston";

const sourceToken = process.env.WINSTON_SOURCE_TOKEN
const ingestingHost =  process.env.WINSTON_INVESTING_HOST

const logtail = new Logtail(sourceToken,
    {
        endpoint: `https://${ingestingHost}`,
    })

export const winstonLogger = winston.createLogger({
    format : winston.format.json(),
    transports: [
        new winston.transports.Console(),
        new LogtailTransport(logtail)
    ]
})