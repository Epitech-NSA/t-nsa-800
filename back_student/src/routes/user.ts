import {Router} from 'express';
import UserController from '../controller/UserController';
import {checkJwt} from '../middlewares/checkJwt';
import {checkRole} from '../middlewares/checkRole';
import { validateFields } from '../middlewares/checkBody';

const router = Router();

router.get('/', [checkJwt, checkRole(['ADMIN'])], UserController.listAll);
router.get('/:id', [checkJwt, checkRole(['ADMIN'])], UserController.getOneById);
router.post('/', [checkJwt, checkRole(['ADMIN']), validateFields(['username', 'password', 'role'])], UserController.newUser);
router.patch('/:id', [checkJwt, checkRole(['ADMIN'])], UserController.editUser);
router.delete('/:id', [checkJwt, checkRole(['ADMIN'])], UserController.deleteUser);


export default router;
