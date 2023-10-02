import winston from 'winston';

const baseLogger = winston.createLogger({
        format: winston.format.json(),
        defaultMeta: { project: 'some projectcio', time: new Date() },
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
            new winston.transports.File({ filename: 'logs/all.log' }),
            new winston.transport.Console({format: winston.format.simple()})
        ],

});

export default baseLogger;