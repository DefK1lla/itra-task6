import Router from 'express';
import UsersController from "../controllers/usersController.js"

const router = new Router();

router.get('/all', UsersController.get);

export default router;