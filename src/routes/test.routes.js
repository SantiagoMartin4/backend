import { Router } from "express";


const testRoutes = Router();

testRoutes.get('/loggerTest', (req, res) => {
    req.logger.fatal('this is a FATAL Error');
    req.logger.error('this is an ERROR level Error');
    req.logger.warning('this is a WARNING Error');
    req.logger.info('this is a INFO Error');
    req.logger.debug('this is a DEBUG Error');
    res.send({message: 'Errors have been sent'});
})

export default testRoutes;