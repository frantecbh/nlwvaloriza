import { Router } from 'express';
import { CreateUserController } from './controllers/CreateUserController';
import { CreateTagController } from './controllers/CreateTagController';

import { ensureAdmin } from "./middlewares/ensureAdmin"
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated"
import { AuthenticateUserController } from './controllers/AutheticateUserController';
import { CreateComplimentController } from './controllers/CreateComplimentController';
import { ListUserSendComplimentsController } from './controllers/ListUserSendComplimentController';
import { ListUserReceiverComplimentsController } from './controllers/ListUserReceiverComplimentController';


const router = Router();

const createUserController = new CreateUserController()
const createTagController = new CreateTagController()
const authenticatUserController = new AuthenticateUserController()
const createComplimentController = new CreateComplimentController()

const listUserSendComplimentsController = new ListUserSendComplimentsController()
const listUserReceiveComplimentsController = new ListUserReceiverComplimentsController()

router.post("/users", createUserController.handle)
router.post("/tags", ensureAuthenticated, ensureAdmin, createTagController.handle)
router.post("/login", authenticatUserController.handle)
router.post("/compliments",ensureAuthenticated, createComplimentController.handle)

router.get("/users/compliments/send", ensureAuthenticated, listUserSendComplimentsController.handle )
router.get("/users/compliments/receive", ensureAuthenticated, listUserReceiveComplimentsController.handle )


export { router }