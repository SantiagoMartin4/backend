import errorEnum from "../services/errors/error.enum.js";


export const errorHandler = (error, req, res, next) => {
    console.log(error.cause);
    switch (error.code) {
        case errorEnum.INVALID_TYPE_ERROR:
            return res.status(400).send({ error: error.name });
        case errorEnum.USER_NOT_FOUND:
            return res.status(404).send({ error: error.name });
        case errorEnum.PRODUCT_NOT_FOUND:
            return res.status(404).send({ error: error.name });
        default:
            return res.status(400).send({ error: "Unhandled error" });
    }
};