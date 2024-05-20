import { Router } from "express";
import { premiumRole, documents, getUsers, deleteInactiveUsers } from "../controllers/user.controller.js";
import { multerUploader } from "../utils/multer.js";
import { checkAuth, roleAuth } from "../middlewares/auth.js";


const usersRoutes = Router();


usersRoutes.get('/premium/:uid', checkAuth, premiumRole);

usersRoutes.post('/:uid/documents', checkAuth, multerUploader.fields([
    { name: 'profile_image', maxCount: 1 },
    { name: 'product_image', maxCount: 1 },
    { name: 'identification', maxCount: 1 },
    { name: 'proof_of_address', maxCount: 1 },
    { name: 'bank_statement', maxCount: 1 }
]), documents);

usersRoutes.get('/', roleAuth(['admin']), getUsers);

usersRoutes.delete('/', roleAuth(['admin']), deleteInactiveUsers);

export default usersRoutes;