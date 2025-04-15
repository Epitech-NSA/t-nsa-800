import winston from "winston"
import {Logtail} from "@logtail/node";
import {LogtailTransport} from "@logtail/winston";

// TODO : mettre des variables d'environnement
const sourceToken = "W95GkQopRtqPJaqP7yQoq2Yt"
const ingestingHost = "s1267183.eu-nbg-2.betterstackdata.com"

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