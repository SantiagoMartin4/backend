import winston from 'winston';

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
}

const devLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'debug'
        })
    ]
});

const prodLogger = winston.createLogger({
    levels: customLevelOptions.levels,
    transports: [
        new winston.transports.Console({
            level: 'info'
        }),
        new winston.transports.File({
            level: "error",
            filename: "./errors.log",
            format: winston.format.simple()
        })
    ]
});

export const addLogger = (req, res, next) => {
    switch (process.env.NODE_ENV) {
        case 'development':
            req.logger = devLogger;
            break;
        case 'production':
            req.logger = prodLogger;
            break;
        default:
            throw new Error('invalid Environment')
    }

    next();
};