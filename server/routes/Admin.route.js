import express from 'express'
import { adminRegister, loginAdmin } from '../controllers/Admin.controller.js';
import adminAuth from '../middleware/AdminAuth.js';

const router = express.Router();

router.get("/adminAuth",adminAuth);
router.post('/register',adminRegister);
router.post('/login',loginAdmin);

export default router;
