import { createLogger, transports, format } from 'winston';

export const logger = createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: format.combine(
        format.timestamp(),
        format.errors({stack: true}),
        format.splat(),
        format.json()
    ),
    defaultMeta: {service: 'travel-planning-api'},
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        }),
    ]
}); 