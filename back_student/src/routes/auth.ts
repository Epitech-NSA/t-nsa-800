import {Router} from 'express';
import AuthController from '../controller/AuthController';
import {checkJwt} from '../middlewares/checkJwt';
import { validateFields } from '../middlewares/checkBody';

const router = Router();
// Login route

router.post('/login', [validateFields(['username', 'password'])], AuthController.login);
router.post('/register', [validateFields(['username', 'password'])], AuthController.register);
router.post('/change-password', [checkJwt, validateFields(['oldPassword', 'newPassword'])], AuthController.changePassword);
router.get('/me', [checkJwt], AuthController.getMe);

export default router;
